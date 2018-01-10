'use strict';

function addSpeech(messages, speech) {
  if (speech) {
    messages = messages.concat({
      type: 0,
      speech
    })
  }
  return messages;
}

function includeMsg(platformFilter, platform) {
  // if platformFilter is set, then filter out other platform messages
  return !platformFilter || platformFilter === platform;
}

function getMessages(response, platformFilter) {
  if (!response || !response.result || !response.result.fulfillment) {
    return [];
  }

  let
    fulfillment = response.result.fulfillment,
    speech = fulfillment.speech || '',
    messages = fulfillment.messages || [],
    lastMessageIdx = messages.length - 1,
    cards = {},
    fixedMsgs = []
  ;

  if (messages.length === 0) {
    // no messages, so return the fulfillment.speech
    fixedMsgs = addSpeech(fixedMsgs, speech);
  }

  messages.forEach((message, idx) => {
    let
      msgType = message.type,
      msgPlatform = message.platform
    ;

    if (msgType === 1 && includeMsg(platformFilter, msgPlatform)) {
      // card
      // init platform card set
      if (!cards[msgPlatform] || !cards[msgPlatform].length) {
        cards[msgPlatform] = [];
      }
      // add card to platform card set
      delete message.platform
      delete message.type

      cards[msgPlatform].push(message);
    }

    if (idx === lastMessageIdx || msgType !== 1) {
      // this is last message or it is not a card
      // create a cards message for each platform
      for (let platform in cards) {
        if (includeMsg(platformFilter, platform) && cards.hasOwnProperty(platform)) {
          // check if there are cards to process
          if (cards[platform].length > 0) {
            // add card set to messages
            fixedMsgs.push({
              type: 1,
              platform,
              cards: [].concat(cards[platform])
            });
            // empty cards group
            cards[platform] = [];
          }
        }
      }
    }
    switch (msgType) {
      case 0: // text
      case 2: // quick replies
      case 3: // image
      case 4: // payload
        // add to outgoing messages
        if (includeMsg(platformFilter, msgPlatform)) {
          fixedMsgs = fixedMsgs.concat(message);
        }
        break;
      case 1:
        // handled above
        break;
      default:
    }
  });
  return fixedMsgs;
}

module.exports = getMessages;
