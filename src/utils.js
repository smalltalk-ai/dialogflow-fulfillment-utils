const structProtoToJson = require('./structjson').structProtoToJson;

/**
 * Traverse an object and convert all goog.protobuf.Struct properties to JSON
 * 
 * @param {object} obj - an object which may contain goog.protobuf.Struct
 * @return {object} object with all goog.protobuf.Struct properties converted to JSON
 */
exports.changeStructProtoToJson = function changeStructProtoToJson(obj) {
  if (obj !== null && typeof obj === 'object') {
    let p;
    for (p in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, p)) {
        if (p === 'fields') {
          return structProtoToJson(obj);
        }
        obj[p] = changeStructProtoToJson(obj[p]);
      } 
    } 
  }
  return obj;
};

/**
 * Get the message type of the message: text, card, etc
 */
exports.getMessageType = function (message) {
  if (message !== null && typeof message === 'object') {
    let p;
    for (p in message) {
      if (Object.prototype.hasOwnProperty.call(message, p)) {
        if (p !== 'platform' && p !== 'message') {
          return p;
        }
      } 
    } 
  }
  return null;
};