'use strict';

const getMessageType = require('./utils').getMessageType;

exports.formatMessage = function (message) {
  const messageType = getMessageType(message);
  let content = null;

  switch(messageType) {
  case 'text':
    content = !message.text || !message.text.text ? null : message.text;
    break;
  case 'quickReplies':
    if (!message.quickReplies.title) {
      content = null;
    } else if (!message.quickReplies.quickReplies || !message.quickReplies.quickReplies.length) {
      content = {
        text: message.quickReplies.title
      };
    } else {
      content = {
        text: message.quickReplies.title,
        quick_replies: message[messageType].quickReplies.map(function(title) {
          return {
            content_type: 'text',
            title,
            payload: title
          };
        })
      };
    }
    break;
  case 'image':
    if (!message.image || !message.image.imageUri) {
      content = null;
    } else {
      content = {
        attachment: {
          type: 'image',
          payload: {
            url: message.image.imageUri,
            is_reusable: true
          }
        }
      };
    }
    break;
  case 'cards':
    if (!message.cards || !message.cards.length) {
      content = null;
    } else {
      content = {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: message['cards'].map(function(card) {
              const fbCard = {
                title: card.title,
                buttons: !card.buttons ? null : card.buttons.map(function(button) {
                  if (button.postback) {
                    if (button.postback.toLowerCase().startsWith('http')) {
                      // URL
                      return {
                        type: 'web_url',
                        title: button.text,
                        url: button.postback
                      };
                    }
                    // POSTBACK
                    return {
                      type: 'postback',
                      title: button.text,
                      payload: button.postback
                    };
                  }
                  // TEXT
                  return {
                    type: 'postback',
                    title: button.text,
                    payload: button.text
                  };
                })
              };
              if (card.subtitle) {
                fbCard.subtitle = card.subtitle;
              }
              if (card.imageUri) {
                fbCard.image_url = card.imageUri;
              }
              return fbCard;
            })
          }
        }
      };
    }
    break;
  case 'payload':
    if (!message.payload || !message.payload.facebook) {
      content = null;
    } else {
      content = message.payload.facebook;
    }
    break;
  }

  return content;
};
