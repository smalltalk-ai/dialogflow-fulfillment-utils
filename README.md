
# dialogflow-fulfillment-utils
[![npm](https://img.shields.io/npm/v/dialogflow-fulfillment-utils.svg)](https://www.npmjs.com/package/dialogflow-fulfillment-utils)

Utility lib for handling Dialogflow v2 API [`detectIntent`](https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.sessions/detectIntent) [Response object's](https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/DetectIntentResponse) `filfillment` object

## Installation

* Requires Dialogflow SDK or similar
* Install module with `npm`:
```shell
npm install --save dialogflow-fulfillment-utils
```

## Usage
Below is an example how to use the module along with the `api` module.

```javascript
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const dffUtils = require('dialogflow-fulfillment-utils');

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(projectId = 'your-project-id') {
  // A unique identifier for the given session
  const sessionId = uuid.v4();
 
  // Create a new session
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);
 
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: 'hello',
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };
 
  // Send request and log result
  const responses = await sessionClient.detectIntent(request);

  // get all the messages from fulfillment
  var messages = dffUtils.getMessages(responses);
  // only get the messages for Facebook Messenger
  var fbMessages = dffUtils.getMessages(responses, 'facebook');
  // only get the messages for Slack
  var slackMessages = dffUtils.getMessages(responses, 'slack');

}
```

## Documentation
[View documentation](docs/README.md) for an overview of all functions and their parameters

## License
See [LICENSE](LICENSE).
