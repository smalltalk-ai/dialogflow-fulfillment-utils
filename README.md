
# dialogflow-fulfillment-utils
[![npm](https://img.shields.io/npm/v/dialogflow-fulfillment-utils.svg)](https://www.npmjs.com/package/dialogflow-fulfillment-utils)

Utility lib for handling Dialogflow [`/query`](https://dialogflow.com/docs/reference/agent/query#get_and_post_responses) [Response object's](https://dialogflow.com/docs/reference/agent/query#get_and_post_responses) `filfillment` object

## Installation

* Requires Api.ai/Dialogflow SDK or similar
* Install module with `npm`:
```shell
npm install --save dialogflow-fulfillment-utils
```

## Usage
Below is an example how to use the module along with the `api` module.

```javascript
const apiai = require('apiai');
const dffUtils = require('dialogflow-fulfillment-utils');

const app = apiai("<your client access token>");

var request = app.textRequest('<Your text query>', {
  sessionId: '<unique session id>'
});

request.on('response', function(response) {
  // get all the messages from fulfillment
  var messages = dffUtils.getMessages(response);
  // only get the messages for Facebook Messenger
  var fbMessages = dffUtils.getMessages(response, 'facebook');
  // only get the messages for Slack
  var slackMessages = dffUtils.getMessages(response, 'slack');
  // code to send messages
});

request.on('error', function(error) {
  console.log(error);
});

request.end();
```

## Documentation
[View documentation](docs/README.md) for an overview of all functions and their parameters

## License
See [LICENSE](LICENSE).
