'use strict';

const
  chai = require('chai'),
  expect = chai.expect,
  fulfillmentUtils = require('./dialogflow-fulfillment-utils')
;

function generateResponse(messages, text) {
  return {
    queryResult: {
      fulfillmentText: text,
      fulfillmentMessages: messages
    }
  };
}

describe('DialogflowFulfillmentUtils.getMessages', () => {
  it('getMessages() should return empty if no parameters are passed in', () => {
    const expected = [];
    expect(fulfillmentUtils.getMessages()).to.deep.equal(expected);
  });

  it('getMessages() should return empty if fulfillmentText and fulfillmentMessages are not passed in', () => {
    const
      response = {
        queryResult: {}
      },
      expected = []
    ;
    expect(fulfillmentUtils.getMessages(response)).to.deep.equal(expected);
  });

  it('getMessages() should return empty if null fulfillmentText is passed in', () => {
    const
      response = {
        queryResult: {
          fulfillmentText: null
        }
      },
      expected = []
    ;
    expect(fulfillmentUtils.getMessages(response)).to.deep.equal(expected);
  });

  it('getMessages() should return empty if empty fulfillmentText is passed in', () => {
    const
      response = {
        queryResult: {
          fulfillmentText: ''
        }
      },
      expected = []
    ;
    expect(fulfillmentUtils.getMessages(response)).to.deep.equal(expected);
  });

  it('getMessages() should return empty if null fulfillmentMessages is passed in', () => {
    const
      response = {
        queryResult: {
          fulfillmentMessages: null
        }
      },
      expected = []
    ;
    expect(fulfillmentUtils.getMessages(response)).to.deep.equal(expected);
  });

  it('getMessages() should return empty if empty fulfillmentMessages is passed in', () => {
    const
      response = {
        queryResult: {
          fulfillmentMessages: []
        }
      },
      expected = []
    ;
    expect(fulfillmentUtils.getMessages(response)).to.deep.equal(expected);
  });

  it('getMessages() should return empty if empty messages and text are passed in', () => {
    const
      response = {
        queryResult: {
          fulfillmentText: '',
          fulfillmentMessages: []
        }
      },
      expected = []
    ;
    expect(fulfillmentUtils.getMessages(response)).to.deep.equal(expected);
  });

  it('getMessages() should return text if empty messages are passed in', () => {
    const
      response = generateResponse([], 'no messages'),
      expected = [{
        platform: '',
        message: 'text',
        text: {
          text: 'no messages'
        }
      }]
    ;
    expect(fulfillmentUtils.getMessages(response)).to.deep.equal(expected);
  });

  it('getMessages() should return same if 1 default message is passed in', () => {
    const
      messages = [{
        text: {
          text: [
            'default'
          ]
        }
      }],
      expected = [{
        platform: '',
        text: {
          text: 'default'
        },
        message: 'text'
      }]
    ;
    expect(fulfillmentUtils.getMessages(generateResponse(messages))).to.deep.equal(expected);
  });

  it('getMessages() should return grouped card if messages contains only 1 card', () => {
    const
      messages = [
        {
          card: {
            title: 'Card 1 Title',
            subtitle: 'Card 1 Subtitle',
            buttons: [
              {
                text: 'Button 1',
                postback: 'clicked-btn-1'
              },
              {
                text: 'Button 2'
              },
              {
                text: 'https://www.google.com/',
                postback: 'https://www.google.com/'
              }
            ]
          },
          platform: 'SLACK'
        }
      ],
      expected = [
        {
          message: 'cards',
          cards: [
            {
              title: 'Card 1 Title',
              subtitle: 'Card 1 Subtitle',
              buttons: [
                {
                  text: 'Button 1',
                  postback: 'clicked-btn-1'
                },
                {
                  text: 'Button 2'
                },
                {
                  text: 'https://www.google.com/',
                  postback: 'https://www.google.com/'
                }
              ]
            },
          ],
          platform: 'SLACK'
        }
      ]
    ;
    expect(fulfillmentUtils.getMessages(generateResponse(messages))).to.deep.equal(expected);
  });

  it('getMessages() should return grouped cards if messages contains cards', () => {
    const
      messages = [
        {
          text: {
            text: [
              'default hi'
            ]
          },
          platform: 'FACEBOOK'
        },
        {
          text: {
            text: [
              'default hi'
            ]
          },
          platform: 'SLACK'
        },
        {
          text: {
            text: [
              'hi'
            ]
          },
          platform: 'FACEBOOK'
        },
        {
          text: {
            text: [
              'default 2'
            ]
          },
          platform: 'FACEBOOK'
        },
        {
          text: {
            text: [
              'hi'
            ]
          },
          platform: 'SLACK'
        },
        {
          text: {
            text: [
              'default 2'
            ]
          },
          platform: 'SLACK'
        },
        {
          image: {
            imageUri: 'https://via.placeholder.com/300/09f/fff.png'
          },
          platform: 'SLACK'
        },
        {
          quickReplies: {
            title: 'QR - Title',
            quickReplies: [
              '1st response',
              '2nd response'
            ]
          },
          platform: 'SLACK'
        },
        {
          card: {
            title: 'Card 1 Title',
            subtitle: 'Card 1 Subtitle',
            buttons: [
              {
                text: 'Button 1',
                postback: 'clicked-btn-1'
              },
              {
                text: 'Button 2'
              },
              {
                text: 'https://www.google.com/'
              }
            ]
          },
          platform: 'SLACK'
        },
        {
          card: {
            title: 'Card 2 Title',
            imageUri: 'https://via.placeholder.com/250/09f/fff.png',
            buttons: [
              {
                text: 'Card 2 Btn 1'
              },
              {
                text: 'click-card2-btn-1'
              }
            ]
          },
          platform: 'SLACK'
        },
        {
          text: {
            text: [
              'default hi'
            ]
          }
        }
      ],
      expected = [
        {
          message: 'text',
          text: {
            text: 'default hi'
          },
          platform: 'FACEBOOK'
        },
        {
          message: 'text',
          text: {
            text: 'default hi'
          },
          platform: 'SLACK'
        },
        {
          message: 'text',
          text: {
            text: 'hi'
          },
          platform: 'FACEBOOK'
        },
        {
          message: 'text',
          text: {
            text: 'default 2'
          },
          platform: 'FACEBOOK'
        },
        {
          message: 'text',
          text: {
            text: 'hi'
          },
          platform: 'SLACK'
        },
        {
          message: 'text',
          text: {
            text: 'default 2'
          },
          platform: 'SLACK'
        },
        {
          message: 'image',
          image: {
            imageUri: 'https://via.placeholder.com/300/09f/fff.png'
          },
          platform: 'SLACK'
        },
        {
          message: 'quickReplies',
          quickReplies: {
            title: 'QR - Title',
            quickReplies: [
              '1st response',
              '2nd response'
            ]
          },
          platform: 'SLACK'
        },
        {
          message: 'cards',
          cards: [
            {
              title: 'Card 1 Title',
              subtitle: 'Card 1 Subtitle',
              buttons: [
                {
                  text: 'Button 1',
                  postback: 'clicked-btn-1'
                },
                {
                  text: 'Button 2'
                },
                {
                  text: 'https://www.google.com/'
                }
              ]
            },
            {
              title: 'Card 2 Title',
              imageUri: 'https://via.placeholder.com/250/09f/fff.png',
              buttons: [
                {
                  text: 'Card 2 Btn 1'
                },
                {
                  text: 'click-card2-btn-1'
                }
              ]
            }
          ],
          platform: 'SLACK'
        },
        {
          message: 'text',
          text: {
            text: 'default hi'
          },
          platform: ''
        }
      ]
    ;
    expect(fulfillmentUtils.getMessages(generateResponse(messages, 'default hi'))).to.deep.equal(expected);
  });

  it('getMessages() should return 2 groups of cards if messages contain seperated cards', () => {
    const
      messages = [
        {
          card: {
            title: 'Card 1',
            buttons: [
              {
                text: 'card 1 btn'
              }
            ]
          },
          platform: 'FACEBOOK'
        },
        {
          card: {
            title: 'Card 2',
            buttons: [
              {
                text: 'card 2 btn'
              }
            ]
          },
          platform: 'FACEBOOK'
        },
        {
          text: {
            text: [
              'text between card group'
            ]
          },
          platform: 'FACEBOOK'
        },
        {
          card: {
            title: 'Card 3',
            buttons: [
              {
                text: 'card 3 btn'
              }
            ]
          },
          platform: 'FACEBOOK'
        },
        {
          card: {
            title: 'Card 4',
            buttons: [
              {
                text: 'card 4 btn'
              }
            ]
          },
          platform: 'FACEBOOK'
        },
        {
          text: {
            text: [
              ''
            ]
          }
        }
      ],
      expected = [
        {
          message: 'cards',
          platform: 'FACEBOOK',
          cards: [
            {
              title: 'Card 1',
              buttons: [{
                text: 'card 1 btn'
              }]
            },
            {
              title: 'Card 2',
              buttons: [{
                text: 'card 2 btn'
              }]
            }
          ]
        },
        {
          message: 'text',
          platform: 'FACEBOOK',
          text: {
            text: 'text between card group'
          }
        },
        {
          message: 'cards',
          platform: 'FACEBOOK',
          cards: [
            {
              title: 'Card 3',
              buttons: [{
                text: 'card 3 btn'
              }]
            },
            {
              title: 'Card 4',
              buttons: [{
                text: 'card 4 btn'
              }]
            }
          ]
        }
      ]
    ;
    expect(fulfillmentUtils.getMessages(generateResponse(messages))).to.deep.equal(expected);
  });

  it('getMessages() should return 2 groups of cards for each platform if messages contain seperated cards', () => {
    const
      messages = [
        {
          card: {
            title: 'Card 1',
            buttons: [
              {
                text: 'card 1 btn'
              }
            ]
          },
          platform: 'SLACK'
        },
        {
          card: {
            title: 'Card 2',
            buttons: [
              {
                text: 'card 2 btn'
              }
            ]
          },
          platform: 'SLACK'
        },
        {
          text: {
            text: [
              'slack text between cards'
            ]
          },
          platform: 'SLACK'
        },
        {
          card: {
            title: 'Card 3',
            buttons: [
              {
                text: 'card 3 btn'
              }
            ]
          },
          platform: 'SLACK'
        },
        {
          card: {
            title: 'Card 4',
            buttons: [
              {
                text: 'card 4 btn'
              }
            ]
          },
          platform: 'SLACK'
        },
        {
          card: {
            title: 'Card 1',
            buttons: [
              {
                text: 'card 1 btn'
              }
            ]
          },
          platform: 'FACEBOOK'
        },
        {
          card: {
            title: 'Card 2',
            buttons: [
              {
                text: 'card 2 btn'
              }
            ]
          },
          platform: 'FACEBOOK'
        },
        {
          text: {
            text: [
              'text between card group'
            ]
          },
          platform: 'FACEBOOK'
        },
        {
          card: {
            title: 'Card 3',
            buttons: [
              {
                text: 'card 3 btn'
              }
            ]
          },
          platform: 'FACEBOOK'
        },
        {
          card: {
            title: 'Card 4',
            buttons: [
              {
                text: 'card 4 btn'
              }
            ]
          },
          platform: 'FACEBOOK'
        },
        {
          text: {
            text: [
              ''
            ]
          }
        }
      ],
      expected = [
        {
          message: 'cards',
          cards: [
            {
              title: 'Card 1',
              buttons: [
                {
                  text: 'card 1 btn'
                }
              ]
            },
            {
              title: 'Card 2',
              buttons: [
                {
                  text: 'card 2 btn'
                }
              ]
            }
          ],
          platform: 'SLACK'
        },
        {
          message: 'text',
          text: {
            text: 'slack text between cards'
          },
          platform: 'SLACK'
        },
        {
          message: 'cards',
          cards: [
            {
              title: 'Card 3',
              buttons: [
                {
                  text: 'card 3 btn'
                }
              ]
            },
            {
              title: 'Card 4',
              buttons: [
                {
                  text: 'card 4 btn'
                }
              ]
            }
          ],
          platform: 'SLACK'
        },
        {
          message: 'cards',
          cards: [
            {
              title: 'Card 1',
              buttons: [
                {
                  text: 'card 1 btn'
                }
              ]
            },
            {
              title: 'Card 2',
              buttons: [
                {
                  text: 'card 2 btn'
                }
              ]
            }
          ],
          platform: 'FACEBOOK'
        },
        {
          message: 'text',
          text: {
            text: 'text between card group'
          },
          platform: 'FACEBOOK'
        },
        {
          message: 'cards',
          cards: [
            {
              title: 'Card 3',
              buttons: [
                {
                  text: 'card 3 btn'
                }
              ]
            },
            {
              title: 'Card 4',
              buttons: [
                {
                  text: 'card 4 btn'
                }
              ]
            }
          ],
          platform: 'FACEBOOK'
        }
      ]
    ;
    expect(fulfillmentUtils.getMessages(generateResponse(messages))).to.deep.equal(expected);
  });

  it('getMessages() should return only platform messages if messages contain multiple platforms', () => {
    const
      filterPlatform = 'facebook',
      messages = [
        {
          card: {
            title: 'Card 1',
            buttons: [
              {
                text: 'card 1 btn'
              }
            ]
          },
          platform: 'SLACK'
        },
        {
          card: {
            title: 'Card 2',
            buttons: [
              {
                text: 'card 2 btn'
              }
            ]
          },
          platform: 'SLACK'
        },
        {
          text: {
            text: [
              'slack text between cards'
            ]
          },
          platform: 'SLACK'
        },
        {
          card: {
            title: 'Card 3',
            buttons: [
              {
                text: 'card 3 btn'
              }
            ]
          },
          platform: 'SLACK'
        },
        {
          card: {
            title: 'Card 4',
            buttons: [
              {
                text: 'card 4 btn'
              }
            ]
          },
          platform: 'SLACK'
        },
        {
          card: {
            title: 'Card 1',
            buttons: [
              {
                text: 'card 1 btn'
              }
            ]
          },
          platform: 'FACEBOOK'
        },
        {
          card: {
            title: 'Card 2',
            buttons: [
              {
                text: 'card 2 btn'
              }
            ]
          },
          platform: 'FACEBOOK'
        },
        {
          text: {
            text: [
              'text between card group'
            ]
          },
          platform: 'FACEBOOK'
        },
        {
          card: {
            title: 'Card 3',
            buttons: [
              {
                text: 'card 3 btn'
              }
            ]
          },
          platform: 'FACEBOOK'
        },
        {
          card: {
            title: 'Card 4',
            buttons: [
              {
                text: 'card 4 btn'
              }
            ]
          },
          platform: 'FACEBOOK'
        },
        {
          text: {
            text: [
              ''
            ]
          }
        }
      ],
      expected = [
        {
          message: 'cards',
          cards: [
            {
              title: 'Card 1',
              buttons: [
                {
                  text: 'card 1 btn'
                }
              ]
            },
            {
              title: 'Card 2',
              buttons: [
                {
                  text: 'card 2 btn'
                }
              ]
            }
          ],
          platform: 'FACEBOOK'
        },
        {
          message: 'text',
          text: {
            text: 'text between card group'
          },
          platform: 'FACEBOOK'
        },
        {
          message: 'cards',
          cards: [
            {
              title: 'Card 3',
              buttons: [
                {
                  text: 'card 3 btn'
                }
              ]
            },
            {
              title: 'Card 4',
              buttons: [
                {
                  text: 'card 4 btn'
                }
              ]
            }
          ],
          platform: 'FACEBOOK'
        }
      ]
    ;
    expect(fulfillmentUtils.getMessages(generateResponse(messages), filterPlatform)).to.deep.equal(expected);
  });
});
