'use strict';

const facebookFormatter = require('./formatter_facebook');
const defaultFormatter = require('./formatter_default');

const DialogflowFulfillmentUtils = function(configuration) {
  const config = Object.assign({
    formatters: {
      default: defaultFormatter,
      facebook: facebookFormatter
    }
  }, configuration || {});

  this.config = config;
};

DialogflowFulfillmentUtils.prototype.formatMessage = require('./message_formatter');
DialogflowFulfillmentUtils.prototype.getMessages = require('./get_messages');

module.exports = DialogflowFulfillmentUtils;
// legacy support
module.exports.getMessages = require('./get_messages.js');
