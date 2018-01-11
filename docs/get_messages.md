# getMessages
The `getMessages()` method returns a modified array of [DialogFlow Message objects](https://dialogflow.com/docs/reference/agent/message-objects) from the Dialogflow [`/query`](https://dialogflow.com/docs/reference/agent/query#get_and_post_responses) [Response object](https://dialogflow.com/docs/reference/agent/query#get_and_post_responses).

## Synopsis
Returns an array of [DialogFlow Message objects](https://dialogflow.com/docs/reference/agent/message-objects) with the [Cards Message objects](https://dialogflow.com/docs/reference/agent/message-objects#card_message_object) are grouped into sets.

## Syntax

```js
const dffUtils = require('dialogflow-fulfillment-utilities')

request.on('response', function(response) {
  var messages = dffUtils.getMessages(response[, platformFilter])
}
```

### Parameters
- `response`<br>
   the Dialogflow [`/query`](https://dialogflow.com/docs/reference/agent/query#get_and_post_responses) [Response object](https://dialogflow.com/docs/reference/agent/query#get_and_post_responses)
- `platformFilter` | *optional*<br>
  only return messages from the specified platform, e.g., `facebook`|`kik`|`line`|`skype`|`slack`|`telegram`|`viber`


### Return Value
An array of [DialogFlow Message objects](https://dialogflow.com/docs/reference/agent/message-objects) with the Card messages grouped. If not `fulfillment.messages` or `fulfillment.speech` is included, an empty array (`[]`) is returned

## Description
The Dialogflow [`/query`](https://dialogflow.com/docs/reference/agent/query#get_and_post_responses) [Response object](https://dialogflow.com/docs/reference/agent/query#get_and_post_responses) returns a `result.fulfillment` object which contains Card Messages listed as individual messages. However, on most platforms, Cards are grouped. `getMessages` will group the Cards and/or filter messages for a specific `platform`.

## Examples
```js
const dffUtils = require('dialogflow-fulfillment-utilities')
var dialogFlowResponse = {
  "result": {
    "fulfillment": {
      "speech": "hi",
      "messages": [{
          "type": 0,
          "platform": "facebook",
          "speech": "hi"
        },
        {
          "type": 1,
          "platform": "facebook",
          "title": "Card 1 Title",
          "subtitle": "Card 1 Subtitle",
          "buttons": [{
            "text": "Button 1",
            "postback": "clicked-btn-1"
          }]
        },
        {
          "type": 1,
          "platform": "facebook",
          "title": "Card 2 Title",
          "subtitle": "Card 2 Subtitle",
          "buttons": [{
            "text": "Button 2",
            "postback": "clicked-btn-2"
          }]
        }
      ]
    }
  }
}

var messages = dffUtils.getMessages(dialogFlowResponse)
```
`messages` value

```js
[{
    "type": 0,
    "platform": "facebook",
    "speech": "hi"
  },
  {
    "type": 1,
    "platform": "facebook",
    "cards": [{
        "title": "Card 1 Title",
        "subtitle": "Card 1 Subtitle",
        "buttons": [{
          "text": "Button 1",
          "postback": "clicked-btn-1"
        }]
      },
      {
        "title": "Card 2 Title",
        "subtitle": "Card 2 Subtitle",
        "buttons": [{
          "text": "Button 2",
          "postback": "clicked-btn-2"
        }]
      }
    ]
  }
]
```
notes: the 2 Card Message objects are grouped into a single Card set
