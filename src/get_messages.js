'use strict';
const { getMessageType, changeStructProtoToJson } = require('./utils');
//const FACEBOOK = require('./facebook_formatter');

function addText(messages, text) {
  if (text) {
    messages = messages.concat({
      platform: '',
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
  const lastMessageIdx = messages.length - 1;
  const cards = {};

  if (messages.length === 0) {
    // no messages, so return the fulfillment.text
    messages = addText(messages, text);
  }

  let fixedMsgs = [];

  messages.forEach((message, idx) => {
    const msgPlatform = message.platform ? message.platform.toUpperCase() : '';
    let msgType = message.message;

    if (!msgType) {
      msgType = getMessageType(message);
      message.message = msgType;
    }

    if (msgType === 'card' && includeMsg(platformFilter, msgPlatform)) {
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
        if (includeMsg(platformFilter, platform) && Object.prototype.hasOwnProperty.call(cards, platform)) {
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
    if (msgType !== 'card' && includeMsg(platformFilter, msgPlatform)) {
      let add = true;
      if (msgType === 'text') {
        // get a single message
        message.text.text = message.text.text[0];
        add = !!message.text.text;
      }
      if (!Object.prototype.hasOwnProperty.call(message, 'platform')) {
        message.platform = '';
      }
      //const formatted = msgPlatform === 'FACEBOOK' ? FACEBOOK.formatMessage(message) : message;
      if (add) {
        fixedMsgs = fixedMsgs.concat(message);
      }
    }
  });
  return fixedMsgs;
}

module.exports = getMessages;
