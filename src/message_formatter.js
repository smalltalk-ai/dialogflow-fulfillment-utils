'use strict';

function formatMessage(message) {
  const platform = message && message.platform ? message.platform.toLowerCase() : 'default';
  const formatter = this.config.formatters[platform] || this.config.formatters.default;
  
  return formatter.formatMessage(message);
}

module.exports = formatMessage;