'use strict';
const { getMessageType, changeStructProtoToJson } = require('./utils');

function addText(messages, text, platform) {
  if (text) {
    messages = messages.concat({
      platform: platform || '',
      text: {
        text: [
          text
        ]
      },
      message: 'text'
    });
  }
  return messages;
}

function includeMsg(platformFilter, platform) {
  // if platformFilter is set, then filter out other platform messages
  return !platformFilter || platformFilter.toUpperCase() === platform;
}

function getMessages(response, platformFilter) {
  response = changeStructProtoToJson(response);
  if (!response || !response.queryResult || (!response.queryResult.fulfillmentText && !response.queryResult.fulfillmentMessages)) {
    return [];
  }

  const queryResult = response.queryResult;
  const text = queryResult.fulfillmentText || '';
  let messages = queryResult.fulfillmentMessages || [];
  const cards = {};

  // filter the messages by platform
  if (platformFilter) {
    messages = messages.filter(function(msg) {
      const msgPlatform = msg.platform ? msg.platform.toUpperCase() : '';
      return includeMsg(platformFilter, msgPlatform);
    });
    if (messages.length === 0 && queryResult.fulfillmentMessages) {
      // no messages, see if there are PLATFORM_UNSPECIFIED messages
      messages = queryResult.fulfillmentMessages.filter(function(msg) {
        return msg.platform && msg.platform === 'PLATFORM_UNSPECIFIED';
      });
      if (messages.length) {
        messages.forEach((message) => {
          message.platform = platformFilter ? platformFilter.toUpperCase() : '';
        });
      }
    }
  }
  const lastMessageIdx = messages.length - 1;

  if (messages.length === 0) {
    // no messages, so return the fulfillment.text
    messages = addText(messages, text, platformFilter);
  }

  let fixedMsgs = [];

  messages.forEach((message, idx) => {
    const msgPlatform = message.platform ? message.platform.toUpperCase() : '';
    let msgType = message.message;

    if (!msgType) {
      msgType = getMessageType(message);
      message.message = msgType;
    }

    if (msgType === 'card') {
      // card
      // init platform card set
      if (!cards[msgPlatform] || !cards[msgPlatform].length) {
        cards[msgPlatform] = [];
      }
      // add card to platform card set
      delete message.platform;

      cards[msgPlatform].push(message.card);
    }
    if (idx === lastMessageIdx || msgType !== 'card') {
      // this is last message or it is not a card
      // create a cards message for each platform
      for (const platform in cards) {
        if (Object.prototype.hasOwnProperty.call(cards, platform)) {
          // check if there are cards to process
          if (cards[platform].length > 0) {
            // add card set to messages
            fixedMsgs.push({
              message: 'cards',
              platform,
              cards: [].concat(cards[platform])
            });
            // empty cards group
            cards[platform] = [];
          }
        }
      }
    }
    if (msgType !== 'card') {
      let add = true;
      if (msgType === 'text') {
        // get a single message
        message.text.text = message.text.text[0];
        add = !!message.text.text;
      }
      if (!Object.prototype.hasOwnProperty.call(message, 'platform')) {
        message.platform = '';
      }
      if (add) {
        fixedMsgs = fixedMsgs.concat(message);
      }
    }
  });
  return fixedMsgs;
}

module.exports = getMessages;
