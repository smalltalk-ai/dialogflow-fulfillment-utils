'use strict';

const
  chai = require('chai'),
  expect = chai.expect,
  fulfillmentUtils = require('./dialogflow-fulfillment-utils')
;

function generateResponse(messages, speech) {
  speech = speech || 'foo bar';
  return {
    result: {
      fulfillment: {
        speech,
        messages
      }
    }
  }
}

describe('DialogflowFulfillmentUtils.getMessages', () => {
  it('getMessages() should return empty if no parameters are passed in', () => {
    const expected = [];
    expect(fulfillmentUtils.getMessages()).to.deep.equal(expected);
  });

  it('getMessages() should return empty if empty response is passed in', () => {
    const
      response = {

      },
      expected = []
    ;
    expect(fulfillmentUtils.getMessages(response)).to.deep.equal(expected);
  });

  it('getMessages() should return empty if empty response.fulfillment is passed in', () => {
    const
      response = {
        fulfillment: {}
      },
      expected = []
    ;
    expect(fulfillmentUtils.getMessages(response)).to.deep.equal(expected);
  });

  it('getMessages() should return empty if empty messages and speech are passed in', () => {
    const
      response = {
        result: {
          fulfillment: {
            messages: []
          }
        }
      },
      expected = []
    ;
    expect(fulfillmentUtils.getMessages(response)).to.deep.equal(expected);
  });

  it('getMessages() should return speech if empty messages are passed in', () => {
    const
      response = generateResponse([], 'no messages'),
      expected = [{
        type: 0,
        speech: 'no messages'
      }]
    ;
    expect(fulfillmentUtils.getMessages(response)).to.deep.equal(expected);
  });

  it('getMessages() should return same if 1 default message is passed in', () => {
    const
      messages = [{
        "type": 0,
        "speech": "hi"
      }],
      expected = [{
        "type": 0,
        "speech": "hi"
      }]
    ;
    expect(fulfillmentUtils.getMessages(generateResponse(messages))).to.deep.equal(expected);
  });

  it('getMessages() should return grouped card if messages contains only 1 card', () => {
    const
      messages = [{
    		"type": 1,
    		"platform": "slack",
    		"title": "Card 1 Title",
    		"subtitle": "Card 1 Subtitle",
    		"buttons": [{
    				"text": "Button 1",
    				"postback": "clicked-btn-1"
    			},
    			{
    				"text": "Button 2",
    				"postback": ""
    			},
    			{
    				"text": "https://www.google.com/",
    				"postback": ""
    			}
    		]
    	}],
      expected = [{
    		"type": 1,
    		"platform": "slack",
        "cards": [{
      		"title": "Card 1 Title",
      		"subtitle": "Card 1 Subtitle",
      		"buttons": [{
      				"text": "Button 1",
      				"postback": "clicked-btn-1"
      			},
      			{
      				"text": "Button 2",
      				"postback": ""
      			},
      			{
      				"text": "https://www.google.com/",
      				"postback": ""
      			}
      		]
        }]
      }]
    ;
    expect(fulfillmentUtils.getMessages(generateResponse(messages))).to.deep.equal(expected);
  });

  it('getMessages() should return grouped cards if messages contains cards', () => {
    const
      messages = [{
      		"type": 0,
      		"platform": "slack",
      		"speech": "hi"
      	},
      	{
      		"type": 0,
      		"platform": "facebook",
      		"speech": "hi"
      	},
      	{
      		"type": 0,
      		"platform": "slack",
      		"speech": "default 2"
      	},
      	{
      		"type": 0,
      		"platform": "facebook",
      		"speech": "default 2"
      	},
      	{
      		"type": 0,
      		"platform": "facebook",
      		"speech": "text 1"
      	},
      	{
      		"type": 0,
      		"speech": "hi"
      	},
      	{
      		"type": 0,
      		"speech": "default 2"
      	},
      	{
      		"type": 0,
      		"platform": "slack",
      		"speech": "text 1 - 3"
      	},
      	{
      		"type": 3,
      		"platform": "slack",
      		"imageUrl": "https://c1.staticflickr.com/4/3015/2765083201_55a958db14_b.jpg"
      	},
      	{
      		"type": 2,
      		"platform": "slack",
      		"title": "QR - Title",
      		"replies": [
      			"1st response",
      			"2nd response"
      		]
      	},
      	{
      		"type": 1,
      		"platform": "slack",
      		"title": "Card 1 Title",
      		"subtitle": "Card 1 Subtitle",
      		"buttons": [{
      				"text": "Button 1",
      				"postback": "clicked-btn-1"
      			},
      			{
      				"text": "Button 2",
      				"postback": ""
      			},
      			{
      				"text": "https://www.google.com/",
      				"postback": ""
      			}
      		]
      	},
      	{
      		"type": 1,
      		"platform": "slack",
      		"title": "Card 2 Title",
      		"imageUrl": "https://c1.staticflickr.com/4/3015/2765083201_55a958db14_b.jpg",
      		"buttons": [{
      			"text": "Card 2 Btn 1",
      			"postback": "click-card2-btn-1"
      		}]
      	}
      ],
      expected = [{
      		"type": 0,
      		"platform": "slack",
      		"speech": "hi"
      	},
      	{
      		"type": 0,
      		"platform": "facebook",
      		"speech": "hi"
      	},
      	{
      		"type": 0,
      		"platform": "slack",
      		"speech": "default 2"
      	},
      	{
      		"type": 0,
      		"platform": "facebook",
      		"speech": "default 2"
      	},
      	{
      		"type": 0,
      		"platform": "facebook",
      		"speech": "text 1"
      	},
      	{
      		"type": 0,
      		"speech": "hi"
      	},
      	{
      		"type": 0,
      		"speech": "default 2"
      	},
      	{
      		"type": 0,
      		"platform": "slack",
      		"speech": "text 1 - 3"
      	},
      	{
      		"type": 3,
      		"platform": "slack",
      		"imageUrl": "https://c1.staticflickr.com/4/3015/2765083201_55a958db14_b.jpg"
      	},
      	{
      		"type": 2,
      		"platform": "slack",
      		"title": "QR - Title",
      		"replies": [
      			"1st response",
      			"2nd response"
      		]
      	},
      	{
      		"type": 1,
      		"platform": "slack",
          "cards": [
            {
          		"title": "Card 1 Title",
          		"subtitle": "Card 1 Subtitle",
          		"buttons": [{
          				"text": "Button 1",
          				"postback": "clicked-btn-1"
          			},
          			{
          				"text": "Button 2",
          				"postback": ""
          			},
          			{
          				"text": "https://www.google.com/",
          				"postback": ""
          			}
          		]
          	},
          	{
          		"title": "Card 2 Title",
          		"imageUrl": "https://c1.staticflickr.com/4/3015/2765083201_55a958db14_b.jpg",
          		"buttons": [{
          			"text": "Card 2 Btn 1",
          			"postback": "click-card2-btn-1"
          		}]
          	}
          ]
        }
      ]
    ;
    expect(fulfillmentUtils.getMessages(generateResponse(messages))).to.deep.equal(expected);
  });

  it('getMessages() should return 2 groups of cards if messages contain seperated cards', () => {
    const
      messages = [{
      		"type": 1,
      		"platform": "facebook",
      		"title": "Card 1",
      		"buttons": [{
      			"text": "card 1 btn",
      			"postback": ""
      		}]
      	},
      	{
      		"type": 1,
      		"platform": "facebook",
      		"title": "Card 2",
      		"buttons": [{
      			"text": "card 2 btn",
      			"postback": ""
      		}]
      	},
      	{
      		"type": 0,
      		"platform": "facebook",
      		"speech": "text between card group"
      	},
      	{
      		"type": 1,
      		"platform": "facebook",
      		"title": "Card 3",
      		"buttons": [{
      			"text": "card 3 btn",
      			"postback": ""
      		}]
      	},
      	{
      		"type": 1,
      		"platform": "facebook",
      		"title": "Card 4",
      		"buttons": [{
      			"text": "card 4 btn",
      			"postback": ""
      		}]
      	},
      	{
      		"type": 0,
      		"speech": ""
      	}
      ],
      expected = [{
      		"type": 1,
      		"platform": "facebook",
          "cards": [
            {
          		"title": "Card 1",
          		"buttons": [{
          			"text": "card 1 btn",
          			"postback": ""
          		}]
          	},
          	{
          		"title": "Card 2",
          		"buttons": [{
          			"text": "card 2 btn",
          			"postback": ""
          		}]
          	}
          ]
        },
      	{
      		"type": 0,
      		"platform": "facebook",
      		"speech": "text between card group"
      	},
      	{
      		"type": 1,
      		"platform": "facebook",
          "cards": [
            {
              "title": "Card 3",
              "buttons": [{
                "text": "card 3 btn",
                "postback": ""
              }]
            },
            {
              "title": "Card 4",
              "buttons": [{
                "text": "card 4 btn",
                "postback": ""
              }]
            }
          ]
        },
      	{
      		"type": 0,
      		"speech": ""
      	}
      ]
    ;
    expect(fulfillmentUtils.getMessages(generateResponse(messages))).to.deep.equal(expected);
  });

  it('getMessages() should return 2 groups of cards for each platform if messages contain seperated cards', () => {
    const
      messages = [{
      		"type": 1,
      		"platform": "facebook",
      		"title": "Card 1",
      		"buttons": [{
      			"text": "card 1 btn",
      			"postback": ""
      		}]
      	},
      	{
      		"type": 1,
      		"platform": "facebook",
      		"title": "Card 2",
      		"buttons": [{
      			"text": "card 2 btn",
      			"postback": ""
      		}]
      	},
        {
      		"type": 1,
      		"platform": "slack",
      		"title": "Card 1",
      		"buttons": [{
      			"text": "card 1 btn",
      			"postback": ""
      		}]
      	},
      	{
      		"type": 1,
      		"platform": "slack",
      		"title": "Card 2",
      		"buttons": [{
      			"text": "card 2 btn",
      			"postback": ""
      		}]
      	},
      	{
      		"type": 0,
      		"platform": "facebook",
      		"speech": "text between card group"
      	},
      	{
      		"type": 1,
      		"platform": "facebook",
      		"title": "Card 3",
      		"buttons": [{
      			"text": "card 3 btn",
      			"postback": ""
      		}]
      	},
      	{
      		"type": 1,
      		"platform": "facebook",
      		"title": "Card 4",
      		"buttons": [{
      			"text": "card 4 btn",
      			"postback": ""
      		}]
      	},
      	{
      		"type": 1,
      		"platform": "slack",
      		"title": "Card 3",
      		"buttons": [{
      			"text": "card 3 btn",
      			"postback": ""
      		}]
      	},
      	{
      		"type": 1,
      		"platform": "slack",
      		"title": "Card 4",
      		"buttons": [{
      			"text": "card 4 btn",
      			"postback": ""
      		}]
      	},
      	{
      		"type": 0,
      		"speech": ""
      	}
      ],
      expected = [{
      		"type": 1,
      		"platform": "facebook",
          "cards": [
            {
          		"title": "Card 1",
          		"buttons": [{
          			"text": "card 1 btn",
          			"postback": ""
          		}]
          	},
          	{
          		"title": "Card 2",
          		"buttons": [{
          			"text": "card 2 btn",
          			"postback": ""
          		}]
          	}
          ]
        },
        {
        	"type": 1,
      		"platform": "slack",
          "cards": [
            {
          		"title": "Card 1",
          		"buttons": [{
          			"text": "card 1 btn",
          			"postback": ""
          		}]
          	},
          	{
          		"title": "Card 2",
          		"buttons": [{
          			"text": "card 2 btn",
          			"postback": ""
          		}]
          	}
          ]
        },
      	{
      		"type": 0,
      		"platform": "facebook",
      		"speech": "text between card group"
      	},
      	{
      		"type": 1,
      		"platform": "facebook",
          "cards": [
            {
              "title": "Card 3",
              "buttons": [{
                "text": "card 3 btn",
                "postback": ""
              }]
            },
            {
              "title": "Card 4",
              "buttons": [{
                "text": "card 4 btn",
                "postback": ""
              }]
            }
          ]
        },
      	{
      		"type": 1,
      		"platform": "slack",
          "cards": [
            {
              "title": "Card 3",
              "buttons": [{
                "text": "card 3 btn",
                "postback": ""
              }]
            },
            {
              "title": "Card 4",
              "buttons": [{
                "text": "card 4 btn",
                "postback": ""
              }]
            }
          ]
        },
      	{
      		"type": 0,
      		"speech": ""
      	}
      ]
    ;
    expect(fulfillmentUtils.getMessages(generateResponse(messages))).to.deep.equal(expected);
  });

    it('getMessages() should return only platform messages if messages contain multiple platforms', () => {
      const
        filterPlatform = 'facebook',
        messages = [{
        		"type": 1,
        		"platform": "facebook",
        		"title": "Card 1",
        		"buttons": [{
        			"text": "card 1 btn",
        			"postback": ""
        		}]
        	},
        	{
        		"type": 1,
        		"platform": "facebook",
        		"title": "Card 2",
        		"buttons": [{
        			"text": "card 2 btn",
        			"postback": ""
        		}]
        	},
          {
        		"type": 1,
        		"platform": "slack",
        		"title": "Card 1",
        		"buttons": [{
        			"text": "card 1 btn",
        			"postback": ""
        		}]
        	},
        	{
        		"type": 1,
        		"platform": "slack",
        		"title": "Card 2",
        		"buttons": [{
        			"text": "card 2 btn",
        			"postback": ""
        		}]
        	},
        	{
        		"type": 0,
        		"platform": "facebook",
        		"speech": "text between card group"
        	},
        	{
        		"type": 1,
        		"platform": "facebook",
        		"title": "Card 3",
        		"buttons": [{
        			"text": "card 3 btn",
        			"postback": ""
        		}]
        	},
        	{
        		"type": 1,
        		"platform": "facebook",
        		"title": "Card 4",
        		"buttons": [{
        			"text": "card 4 btn",
        			"postback": ""
        		}]
        	},
        	{
        		"type": 1,
        		"platform": "slack",
        		"title": "Card 3",
        		"buttons": [{
        			"text": "card 3 btn",
        			"postback": ""
        		}]
        	},
        	{
        		"type": 1,
        		"platform": "slack",
        		"title": "Card 4",
        		"buttons": [{
        			"text": "card 4 btn",
        			"postback": ""
        		}]
        	},
        	{
        		"type": 0,
            "platform": "slack",
        		"speech": "foo bar"
        	},
        	{
        		"type": 0,
        		"speech": ""
        	}
        ],
        expected = [{
        		"type": 1,
        		"platform": "facebook",
            "cards": [
              {
            		"title": "Card 1",
            		"buttons": [{
            			"text": "card 1 btn",
            			"postback": ""
            		}]
            	},
            	{
            		"title": "Card 2",
            		"buttons": [{
            			"text": "card 2 btn",
            			"postback": ""
            		}]
            	}
            ]
          },
        	{
        		"type": 0,
        		"platform": "facebook",
        		"speech": "text between card group"
        	},
        	{
        		"type": 1,
        		"platform": "facebook",
            "cards": [
              {
                "title": "Card 3",
                "buttons": [{
                  "text": "card 3 btn",
                  "postback": ""
                }]
              },
              {
                "title": "Card 4",
                "buttons": [{
                  "text": "card 4 btn",
                  "postback": ""
                }]
              }
            ]
          }
        ]
      ;
      expect(fulfillmentUtils.getMessages(generateResponse(messages), filterPlatform)).to.deep.equal(expected);
    });
});
