'use strict';

const
  chai = require('chai'),
  expect = chai.expect,
  DialogflowFulfillmentUtils = require('./dialogflow-fulfillment-utils'),
  dffUtils = new DialogflowFulfillmentUtils()
;

describe('formatMessage functions', function() {
  it('should return facebook text message', function(done) {
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
    expect(dffUtils.formatMessage(message)).to.deep.equal(expected);
    done();
  });

  it('should return same message when unsupported platform passed in', function(done) {
    const message = {
      platform: 'SLACK',
      text: {
        text: 'foo bar'
      },
      message: 'text'
    };
    expect(dffUtils.formatMessage(message)).to.deep.equal(message);
    done();
  });
});