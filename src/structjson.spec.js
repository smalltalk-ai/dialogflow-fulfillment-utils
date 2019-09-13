'use strict';

const
  chai = require('chai'),
  expect = chai.expect,
  structjson = require('./structjson')
;

describe('structProtoToJson functions', function() {
  it('should return empty when null passed in', function(done) {
    const obj = null;
    const expected = {};
    expect(structjson.structProtoToJson(obj)).to.deep.equal(expected);
    done();
  });

  it('should return empty when no fields passed in', function(done) {
    const obj = {};
    const expected = {};
    expect(structjson.structProtoToJson(obj)).to.deep.equal(expected);
    done();
  });

  it('should return null value when no kind is not specified', function(done) {
    const obj = {
      fields: {
        bar: {
          kind: 'numberValue',
          numberValue: 7
        },
        test1: {
          stringValue: 'foo'
        }
      }
    };
    const expected = {
      bar: 7,
      test1: null
    };
    expect(structjson.structProtoToJson(obj)).to.deep.equal(expected);
    done();
  });

  it('should return null when unknown kind property', function(done) {
    const obj = {
      fields: {
        foo: {
          kind: 'structValue',
          structValue: {
            fields: {
              bar: {
                kind: 'numberValue',
                numberValue: 7
              },
              test1: {
                kind: 'nullValue'
              },
              test2: {
                kind: 'fooValue',
                boolValue: 'bar'
              }
            }
          }
        }
      }
    };
    const expected = {
      foo: {
        bar: 7,
        test1: null,
        test2: null
      }
    };
    expect(structjson.structProtoToJson(obj)).to.deep.equal(expected);
    done();
  });
});

describe('jsonToStructProto functions', function() {
  it('should return empty fields when object is null', function(done) {
    const json = null;
    const expected = {
      fields: {}
    };
    expect(structjson.jsonToStructProto(json)).to.deep.equal(expected);
    done();
  });

  it('should return struct proto when json', function(done) {
    const json = {
      bad: undefined,
      bar: null,
      foo: {
        bar: 7,
        test1: 'foo',
        test2: true
      },
      test3: 1,
      test4: 'bar',
      test5: [
        {
          test6: 'list'
        }
      ]
    };
    const expected = {
      fields: {
        bad: {},
        bar: {
          kind: 'nullValue',
          nullValue: 'NULL_VALUE'
        },
        foo: {
          kind: 'structValue',
          structValue: {
            fields: {
              bar: {
                kind: 'numberValue',
                numberValue: 7
              },
              test1: {
                kind: 'stringValue',
                stringValue: 'foo'
              },
              test2: {
                kind: 'boolValue',
                boolValue: true
              }
            }
          }
        },
        test3: {
          kind: 'numberValue',
          numberValue: 1
        },
        test4: {
          kind: 'stringValue',
          stringValue: 'bar'
        },
        test5: {
          kind: 'listValue',
          listValue: {
            values: [
              {
                kind: 'structValue',
                structValue: {
                  fields: {
                    test6: {
                      kind: 'stringValue',
                      stringValue: 'list'
                    }
                  }
                }
              }
            ]
          }
        }
      }
    };
    expect(structjson.jsonToStructProto(json)).to.deep.equal(expected);
    done();
  });
});
