'use strict';

const
  chai = require('chai'),
  expect = chai.expect,
  utils = require('./utils')
;

describe('getMessageType functions', function() {
  it('should return null when object is null', function(done) {
    const obj = null;
    expect(utils.getMessageType(obj)).to.equal(null);
    done();
  });

  it('should return null when object is a string', function(done) {
    const obj = 'foo';
    expect(utils.getMessageType(obj)).to.equal(null);
    done();
  });

  it('should return null when object is empty', function(done) {
    const obj = {};
    expect(utils.getMessageType(obj)).to.equal(null);
    done();
  });

  it('should return null when object only has platform property', function(done) {
    const obj = {
      platform: ''
    };
    expect(utils.getMessageType(obj)).to.equal(null);
    done();
  });

  it('should return value when object only 1 property', function(done) {
    const obj = {
      text: ''
    };
    const expected = 'text';
    expect(utils.getMessageType(obj)).to.equal(expected);
    done();
  });

  it('should return value when object only property and platform', function(done) {
    const obj = {
      platform: '',
      card: ''
    };
    const expected = 'card';
    expect(utils.getMessageType(obj)).to.equal(expected);
    done();
  });
});

describe('changeStructProtoToJson functions', function() {
  it('should return null when object is null', function(done) {
    const obj = null;
    expect(utils.changeStructProtoToJson(obj)).to.equal(null);
    done();
  });

  it('should return same value when object is a string', function(done) {
    const obj = 'foo bar';
    expect(utils.changeStructProtoToJson(obj)).to.equal('foo bar');
    done();
  });

  it('should return same value when object is an integer', function(done) {
    const obj = 42;
    expect(utils.changeStructProtoToJson(obj)).to.equal(42);
    done();
  });

  it('should return same value when object is deep', function(done) {
    const obj = {
      queryResult: {
        parameters: {}
      },
      foo: 'bar'
    };
    const expected = {
      queryResult: {
        parameters: {}
      },
      foo: 'bar'
    };
    expect(utils.changeStructProtoToJson(obj)).to.deep.equal(expected);
    done();
  });

  it('should return empty value when property is empty fields', function(done) {
    const obj = {
      queryResult: {
        parameters: {
          fields: {}
        }
      }
    };
    const expected = {
      queryResult: {
        parameters: {}
      }
    };
    expect(utils.changeStructProtoToJson(obj)).to.deep.equal(expected);
    done();
  });

  it('should replace goog.protobuf.Struct with JSON in complex object', function(done) {
    const obj = {
      responseId:'ef4ef712-5d5a-4714-aeca-9d334f47d818-ad9426ce',
      queryResult:{
        fulfillmentMessages:[
          {
            platform:'FACEBOOK',
            payload:{
              fields:{
                facebook:{
                  structValue:{
                    fields:{
                      attachment:{
                        structValue:{
                          fields:{
                            type:{
                              stringValue:'template',
                              kind:'stringValue'
                            },
                            payload:{
                              structValue:{
                                fields:{
                                  buttons:{
                                    listValue:{
                                      values:[
                                        {
                                          structValue:{
                                            fields:{
                                              title:{
                                                stringValue:'Button 1 Title',
                                                kind:'stringValue'
                                              },
                                              payload:{
                                                stringValue:'clicked-button-1',
                                                kind:'stringValue'
                                              },
                                              type:{
                                                stringValue:'postback',
                                                kind:'stringValue'
                                              }
                                            }
                                          },
                                          kind:'structValue'
                                        },
                                        {
                                          structValue:{
                                            fields:{
                                              payload:{
                                                stringValue:'clicked-button-2',
                                                kind:'stringValue'
                                              },
                                              type:{
                                                stringValue:'postback',
                                                kind:'stringValue'
                                              },
                                              title:{
                                                stringValue:'Button 2 Title',
                                                kind:'stringValue'
                                              }
                                            }
                                          },
                                          kind:'structValue'
                                        },
                                        {
                                          structValue:{
                                            fields:{
                                              title:{
                                                stringValue:'Button 3 Title',
                                                kind:'stringValue'
                                              },
                                              payload:{
                                                stringValue:'clicked-button-3',
                                                kind:'stringValue'
                                              },
                                              type:{
                                                stringValue:'postback',
                                                kind:'stringValue'
                                              }
                                            }
                                          },
                                          kind:'structValue'
                                        }
                                      ]
                                    },
                                    kind:'listValue'
                                  },
                                  template_type:{
                                    stringValue:'button',
                                    kind:'stringValue'
                                  },
                                  text:{
                                    stringValue:'Welcome to Acme Inc Virtual Assistant! What can I help you with today?',
                                    kind:'stringValue'
                                  }
                                }
                              },
                              kind:'structValue'
                            }
                          }
                        },
                        kind:'structValue'
                      }
                    }
                  },
                  kind:'structValue'
                }
              }
            },
            message:'payload'
          }
        ],
        outputContexts:[],
        queryText:'hi',
        speechRecognitionConfidence:0,
        action:'',
        parameters:{
          fields:{
  
          }
        },
        allRequiredParamsPresent:true,
        fulfillmentText:'',
        webhookSource:'',
        webhookPayload:null,
        intent:{
          inputContextNames:[
  
          ],
          events:[
  
          ],
          trainingPhrases:[
  
          ],
          outputContexts:[
  
          ],
          parameters:[
  
          ],
          messages:[
  
          ],
          defaultResponsePlatforms:[
  
          ],
          followupIntentInfo:[
  
          ],
          name:'projects/my-bot-agent/agent/intents/12345678-f9cf-4142-950c-0c8c9edeb4b5',
          displayName:'0.1-Get-Started',
          priority:0,
          isFallback:false,
          webhookState:'WEBHOOK_STATE_UNSPECIFIED',
          action:'',
          resetContexts:false,
          rootFollowupIntentName:'',
          parentFollowupIntentName:'',
          mlDisabled:false
        },
        intentDetectionConfidence:1,
        diagnosticInfo:null,
        languageCode:'en'
      },
      webhookStatus:null
    };
    const expected = {
      responseId:'ef4ef712-5d5a-4714-aeca-9d334f47d818-ad9426ce',
      queryResult:{
        fulfillmentMessages:[
          {
            platform:'FACEBOOK',
            payload:{
              facebook: {
                attachment: {
                  type: 'template',
                  payload: {
                    template_type: 'button',
                    text: 'Welcome to Acme Inc Virtual Assistant! What can I help you with today?',
                    buttons: [
                      {
                        type: 'postback',
                        title: 'Button 1 Title',
                        payload: 'clicked-button-1'
                      },
                      {
                        type: 'postback',
                        title: 'Button 2 Title',
                        payload: 'clicked-button-2'
                      },
                      {
                        type: 'postback',
                        title: 'Button 3 Title',
                        payload: 'clicked-button-3'
                      }
                    ]
                  }
                }
              }
            },
            message:'payload'
          }
        ],
        outputContexts:[],
        queryText:'hi',
        speechRecognitionConfidence:0,
        action:'',
        parameters:{},
        allRequiredParamsPresent:true,
        fulfillmentText:'',
        webhookSource:'',
        webhookPayload:null,
        intent:{
          inputContextNames:[],
          events:[],
          trainingPhrases:[],
          outputContexts:[],
          parameters:[],
          messages:[],
          defaultResponsePlatforms:[],
          followupIntentInfo:[],
          name:'projects/my-bot-agent/agent/intents/12345678-f9cf-4142-950c-0c8c9edeb4b5',
          displayName:'0.1-Get-Started',
          priority:0,
          isFallback:false,
          webhookState:'WEBHOOK_STATE_UNSPECIFIED',
          action:'',
          resetContexts:false,
          rootFollowupIntentName:'',
          parentFollowupIntentName:'',
          mlDisabled:false
        },
        intentDetectionConfidence:1,
        diagnosticInfo:null,
        languageCode:'en'
      },
      webhookStatus:null
    };
    expect(utils.changeStructProtoToJson(obj)).to.deep.equal(expected);
    done();
  });
});
