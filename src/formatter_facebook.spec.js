'use strict';

const
  chai = require('chai'),
  expect = chai.expect,
  formatter = require('./formatter_facebook')
;

describe('formatter_facebook.formatMessage text', () => {
  it('formatMessage() should return null if no parameters are passed in', () => {
    const expected = null;
    expect(formatter.formatMessage()).to.deep.equal(expected);
  });

  it('formatMessage() should return null if null text property is passed in', () => {
    const message = {
      platform: 'FACEBOOK',
      text: {
        text: null
      },
      message: 'text'
    };
    const expected = null;
    expect(formatter.formatMessage(message)).to.deep.equal(expected);
  });

  it('formatMessage() should return null if empty text property is passed in', () => {
    const message = {
      platform: 'FACEBOOK',
      text: {
        text: ''
      },
      message: 'text'
    };
    const expected = null;
    expect(formatter.formatMessage(message)).to.deep.equal(expected);
  });

  it('formatMessage() should return text if text property is passed in', () => {
    const message = {
      platform: 'FACEBOOK',
      text: {
        text: 'foo bar'
      },
      message: 'text'
    };
    const expected = {
      text: 'foo bar'
    };
    expect(formatter.formatMessage(message)).to.deep.equal(expected);
  });

});

describe('formatter_facebook.formatMessage quick_replies', () => {
  it('formatMessage() should return null if null title property is passed in', () => {
    const message = {
      platform: 'FACEBOOK',
      quickReplies: {
        quickReplies: [
          'ans 1',
          'answer 2'
        ],
        title: null
      },
      message: 'quickReplies'
    };
    const expected = null;
    expect(formatter.formatMessage(message)).to.deep.equal(expected);
  });

  it('formatMessage() should return null if empty title property is passed in', () => {
    const message = {
      platform: 'FACEBOOK',
      quickReplies: {
        quickReplies: [
          'ans 1',
          'answer 2'
        ],
        title: ''
      },
      message: 'quickReplies'
    };
    const expected = null;
    expect(formatter.formatMessage(message)).to.deep.equal(expected);
  });

  it('formatMessage() should return text if quickReplies property not is passed in', () => {
    const message = {
      platform: 'FACEBOOK',
      quickReplies: {
        title: 'QR'
      },
      message: 'quickReplies'
    };
    const expected = {
      text: 'QR'
    };
    expect(formatter.formatMessage(message)).to.deep.equal(expected);
  });

  it('formatMessage() should return text if null quickReplies property is passed in', () => {
    const message = {
      platform: 'FACEBOOK',
      quickReplies: {
        quickReplies: null,
        title: 'QR'
      },
      message: 'quickReplies'
    };
    const expected = {
      text: 'QR'
    };
    expect(formatter.formatMessage(message)).to.deep.equal(expected);
  });

  it('formatMessage() should return text if empty quickReplies property is passed in', () => {
    const message = {
      platform: 'FACEBOOK',
      quickReplies: {
        quickReplies: [],
        title: 'QR'
      },
      message: 'quickReplies'
    };
    const expected = {
      text: 'QR'
    };
    expect(formatter.formatMessage(message)).to.deep.equal(expected);
  });

  it('formatMessage() should return quick reply if quickReplies property is passed in', () => {
    const message = {
      platform: 'FACEBOOK',
      quickReplies: {
        quickReplies: [
          'ans 1',
          'answer 2'
        ],
        title: 'QR'
      },
      message: 'quickReplies'
    };
    const expected = {
      text: 'QR',
      quick_replies:[
        {
          content_type: 'text',
          title: 'ans 1',
          payload: 'ans 1'
        },{
          content_type: 'text',
          title: 'answer 2',
          payload: 'answer 2'
        }
      ]
    };
    expect(formatter.formatMessage(message)).to.deep.equal(expected);
  });

});

describe('formatter_facebook.formatMessage generic_template', () => {
  it('formatMessage() should return null if null cards property is passed in', () => {
    const message = {
      message: 'cards',
      platform: 'FACEBOOK',
      cards: null
    };
    const expected = null;
    expect(formatter.formatMessage(message)).to.deep.equal(expected);
  });

  it('formatMessage() should return null if empty cards property is passed in', () => {
    const message = {
      message: 'cards',
      platform: 'FACEBOOK',
      cards: []
    };
    const expected = null;
    expect(formatter.formatMessage(message)).to.deep.equal(expected);
  });

  it('formatMessage() should return generic template if cards property is passed in', () => {
    const message = {
      message: 'cards',
      platform: 'FACEBOOK',
      cards: [
        {
          buttons: [
            {
              text: 'But1',
              postback: 'clicked-1'
            }
          ],
          title: 'Card 1',
          subtitle: '',
          imageUri: 'https://blog.google/static/blog/images/google-200x200.7714256da16f.png'
        },
        {
          buttons: [
            {
              text: 'But2',
              postback: 'https://www.google.com'
            },
            {
              text: 'Button 3',
              postback: ''
            }
          ],
          title: 'Card 2',
          subtitle: 'Card 2 sub',
          imageUri: ''
        }
      ]
    };
    const expected = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [
            {
              title: 'Card 1',
              image_url: 'https://blog.google/static/blog/images/google-200x200.7714256da16f.png',
              buttons: [
                {
                  type: 'postback',
                  title: 'But1',
                  payload: 'clicked-1'
                }
              ]      
            },
            {
              title: 'Card 2',
              subtitle: 'Card 2 sub',
              buttons: [
                {
                  type: 'web_url',
                  url: 'https://www.google.com',
                  title: 'But2'
                },
                {
                  type: 'postback',
                  title: 'Button 3',
                  payload: 'Button 3'
                }
              ]      
            }
          ]
        }
      }
    };
    expect(formatter.formatMessage(message)).to.deep.equal(expected);
  });
});

describe('formatter_facebook.formatMessage image', () => {
  it('formatMessage() should return null if null image property is passed in', () => {
    const message = {
      image: null,
      platform: 'FACEBOOK'
    };
    const expected = null;
    expect(formatter.formatMessage(message)).to.deep.equal(expected);
  });

  it('formatMessage() should return null if empty image property is passed in', () => {
    const message = {
      image: {},
      platform: 'FACEBOOK'
    };
    const expected = null;
    expect(formatter.formatMessage(message)).to.deep.equal(expected);
  });

  it('formatMessage() should return null if null imageUri property is passed in', () => {
    const message = {
      image: {
        imageUri: null
      },
      platform: 'FACEBOOK'
    };
    const expected = null;
    expect(formatter.formatMessage(message)).to.deep.equal(expected);
  });

  it('formatMessage() should return null if empty imageUri property is passed in', () => {
    const message = {
      image: {
        imageUri: ''
      },
      platform: 'FACEBOOK'
    };
    const expected = null;
    expect(formatter.formatMessage(message)).to.deep.equal(expected);
  });

  it('formatMessage() should return image if image property is passed in', () => {
    const message = {
      image: {
        imageUri: 'https://picsum.photos/382/200'
      },
      platform: 'FACEBOOK'
    };
    const expected = {
      attachment: {
        type: 'image', 
        payload: {
          url: 'https://picsum.photos/382/200', 
          is_reusable: true
        }
      }
    };
    expect(formatter.formatMessage(message)).to.deep.equal(expected);
  });
});
