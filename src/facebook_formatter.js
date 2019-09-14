'use strict';

const getMessageType = require('./utils').getMessageType;

exports.formatMessage = function (message) {
  const messageType = message.message || getMessageType(message);
  let content = null;

  switch(messageType) {
  case 'text':
    content = message[messageType];
    break;
  case 'quickReplies':
    content = {
      text: message[messageType].title,
      quick_replies: message[messageType].quickReplies.map(function(title) {
        return {
          content_type: 'text',
          title
        };
      })
    };
    break;
  case 'cards':
    content = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: message['cards'].map(function(card) {
            return {
              title: card.title,
              image_url: card.imageUri,
              subtitle: card.subtitle,
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
                  type: 'text',
                  title: button.text
                };
              })
            };
          })
        }
      }
    };
    break;
  }

  return {
    platform: message.platform,
    content
  };
};
