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

function getMessages(response, platform) {
  if (!response || !response.result ||
        !response.result.fulfillment) {
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
    if (msgType === 1) {
      // card
      // proccess cards after all cards are added
      if (!cards[msgPlatform] || !cards[msgPlatform].length) {
        cards[msgPlatform] = [];
      }
      //console.log(cards, cards[platform]);
      delete message.platform
      delete message.type
      //console.log(platform, message);
      cards[msgPlatform].push(message);
      //console.log('post', platform, cards[platform]);
    }
    //console.log('process cards', idx === lastMessageIdx, message.type !== 1, message);
    if (idx === lastMessageIdx || msgType !== 1) {
      // this is last message or it is not a card
      // create a cards message for each platform
      for (let platform in cards) {
        if (cards.hasOwnProperty(platform)) {
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
        fixedMsgs = fixedMsgs.concat(message);
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
