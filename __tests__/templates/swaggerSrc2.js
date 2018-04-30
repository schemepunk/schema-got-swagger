const SchemePunk = require('@schemepunk/scheme-punk');
const fs = require('fs');
const yaml = require('js-yaml');
let tmpMocks = [];

const data = new Promise((resolve, reject) => {
  fs.readFile(`${__dirname}/../../examples/swagger-src-swagger-2-example.yaml`, (err, item) => {
    if (err) {
      return reject(new Error('problem loading swagger src example in templates test.')); // eslint-disable-line max-len
    }
    return resolve(yaml.load(item));
  });
});

const swagger2Template = require('./../../templates/swaggerSrc/2/0/0/swagger');

describe('Main Swagger template tests.', () => {
  beforeEach(() => {
    tmpMocks.forEach(mock => mock.mockRestore());
    tmpMocks = [];
    jest.resetAllMocks();
    jest.spyOn(Date, 'now').mockReturnValue(2000);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  test('Title render', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: '2.swaggerSrc',
          },
          transform: {
            plugin: 'tokenTemplateValues',
            template: {
              targetPartial: 'title',
            },
          },
          destination: {
            target: 'tempDest',
          },
          templateObject: swagger2Template,
        };
        const testSchemePunk = new SchemePunk(options);
        // Set up schemas:
        const schemas = SchemePunk.createScheme();
        schemas.originalScheme = file;
        schemas.activeScheme = { tempDest: {} };
        schemas.newScheme = { tempDest: {} };

        return testSchemePunk.enhance(schemas);
      })
      .then(result => expect(result.newScheme.tempDest).toEqual('Swagger Example APi'));
  });
  test('Description render', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: '2.swaggerSrc',
          },
          transform: {
            plugin: 'tokenTemplateValues',
            template: {
              targetPartial: 'description',
            },
          },
          destination: {
            target: 'tempDest',
          },
          templateObject: swagger2Template,
        };
        const testSchemePunk = new SchemePunk(options);
        // Set up schemas:
        const schemas = SchemePunk.createScheme();
        schemas.originalScheme = file;
        schemas.activeScheme = { tempDest: {} };
        schemas.newScheme = { tempDest: {} };

        return testSchemePunk.enhance(schemas);
      })
      .then(result => expect(result.newScheme.tempDest).toEqual('An example Api for example corp.'));
  });
  test('Version render', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: '2.swaggerSrc',
          },
          transform: {
            plugin: 'tokenTemplateValues',
            template: {
              targetPartial: 'version',
            },
          },
          destination: {
            target: 'tempDest',
          },
          templateObject: swagger2Template,
        };
        const testSchemePunk = new SchemePunk(options);
        // Set up schemas:
        const schemas = SchemePunk.createScheme();
        schemas.originalScheme = file;
        schemas.activeScheme = { tempDest: {} };
        schemas.newScheme = { tempDest: {} };

        return testSchemePunk.enhance(schemas);
      })
      .then(result => expect(result.newScheme.tempDest).toEqual('3.14.0'));
  });
  test('Terms of Service render', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: '2.swaggerSrc',
          },
          transform: {
            plugin: 'tokenTemplateValues',
            template: {
              targetPartial: 'termsOfService',
            },
          },
          destination: {
            target: 'tempDest',
          },
          templateObject: swagger2Template,
        };
        const testSchemePunk = new SchemePunk(options);
        // Set up schemas:
        const schemas = SchemePunk.createScheme();
        schemas.originalScheme = file;
        schemas.activeScheme = { tempDest: {} };
        schemas.newScheme = { tempDest: {} };

        return testSchemePunk.enhance(schemas);
      })
      .then(result => expect(result.newScheme.tempDest).toEqual('')); // Optional so we left this blank.
  });
  test('Contact render', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: '2.swaggerSrc',
          },
          transform: {
            plugin: 'tokenTemplateValues',
            template: {
              targetPartial: 'contact',
            },
          },
          destination: {
            target: 'tempDest',
          },
          templateObject: swagger2Template,
        };
        const testSchemePunk = new SchemePunk(options);
        // Set up schemas:
        const schemas = SchemePunk.createScheme();
        schemas.originalScheme = file;
        schemas.activeScheme = { tempDest: {} };
        schemas.newScheme = { tempDest: {} };

        return testSchemePunk.enhance(schemas);
      })
      .then(result => expect(result.newScheme.tempDest).toEqual('{ "name": "Dave Example", "url": "http://example.com", "email": "example@example.com" }'));
  });
  test('Schemes render', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: '2.swaggerSrc',
          },
          transform: {
            plugin: 'tokenTemplateValues',
            template: {
              targetPartial: 'schemes',
            },
          },
          destination: {
            target: 'tempDest',
          },
          templateObject: swagger2Template,
        };
        const testSchemePunk = new SchemePunk(options);
        // Set up schemas:
        const schemas = SchemePunk.createScheme();
        schemas.originalScheme = file;
        schemas.activeScheme = { tempDest: {} };
        schemas.newScheme = { tempDest: {} };

        return testSchemePunk.enhance(schemas);
      })
      .then(result => expect(result.newScheme.tempDest).toEqual('["https","http"]'));
  });
  test('Produces render', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: '2.swaggerSrc',
          },
          transform: {
            plugin: 'tokenTemplateValues',
            template: {
              targetPartial: 'produces',
            },
          },
          destination: {
            target: 'tempDest',
          },
          templateObject: swagger2Template,
        };
        const testSchemePunk = new SchemePunk(options);
        // Set up schemas:
        const schemas = SchemePunk.createScheme();
        schemas.originalScheme = file;
        schemas.activeScheme = { tempDest: {} };
        schemas.newScheme = { tempDest: {} };

        return testSchemePunk.enhance(schemas);
      })
      .then(result => expect(result.newScheme.tempDest).toEqual('["vnd.api+json"]'));
  });
  test('Consumes render', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: '2.swaggerSrc',
          },
          transform: {
            plugin: 'tokenTemplateValues',
            template: {
              targetPartial: 'consumes',
            },
          },
          destination: {
            target: 'tempDest',
          },
          templateObject: swagger2Template,
        };
        const testSchemePunk = new SchemePunk(options);
        // Set up schemas:
        const schemas = SchemePunk.createScheme();
        schemas.originalScheme = file;
        schemas.activeScheme = { tempDest: {} };
        schemas.newScheme = { tempDest: {} };

        return testSchemePunk.enhance(schemas);
      })
      .then(result => expect(result.newScheme.tempDest).toEqual('["vnd.api+json"]'));
  });
  test('Definitions render', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: '2.swaggerSrc',
          },
          transform: {
            plugin: 'tokenTemplateValues',
            template: {
              targetPartial: 'definitions',
            },
          },
          destination: {
            target: 'tempDest',
          },
          templateObject: swagger2Template,
        };
        const testSchemePunk = new SchemePunk(options);
        // Set up schemas:
        const schemas = SchemePunk.createScheme();
        schemas.originalScheme = file;
        schemas.activeScheme = { tempDest: {} };
        schemas.newScheme = { tempDest: {} };

        return testSchemePunk.enhance(schemas);
      })
      .then(result => expect(result.newScheme.tempDest).toEqual('{"example":{"type":"object","properties":{"id":{"type":"integer","format":"int64"},"name":{"type":"string"}}},"example2":{"type":"object","properties":{"name":{"type":"string"}}}}'));
  });
  test('Parameters render', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: '2.swaggerSrc',
          },
          transform: {
            plugin: 'tokenTemplateValues',
            template: {
              targetPartial: 'parameters',
            },
          },
          destination: {
            target: 'tempDest',
          },
          templateObject: swagger2Template,
        };
        const testSchemePunk = new SchemePunk(options);
        // Set up schemas:
        const schemas = SchemePunk.createScheme();
        schemas.originalScheme = file;
        schemas.activeScheme = { tempDest: {} };
        schemas.newScheme = { tempDest: {} };

        return testSchemePunk.enhance(schemas);
      })
      .then(result => expect(result.newScheme.tempDest).toEqual('{"skipParam":{"name":"skip","in":"query","description":"number of items to skip","required":true,"type":"integer","format":"int32"}}'));
  });
  test('Responses render', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: '2.swaggerSrc',
          },
          transform: {
            plugin: 'tokenTemplateValues',
            template: {
              targetPartial: 'responses',
            },
          },
          destination: {
            target: 'tempDest',
          },
          templateObject: swagger2Template,
        };
        const testSchemePunk = new SchemePunk(options);
        // Set up schemas:
        const schemas = SchemePunk.createScheme();
        schemas.originalScheme = file;
        schemas.activeScheme = { tempDest: {} };
        schemas.newScheme = { tempDest: {} };

        return testSchemePunk.enhance(schemas);
      })
      .then(result => expect(result.newScheme.tempDest).toEqual('{"notFound":{"description":"Entity not found."},"IllegalInput":{"description":"Illegal input for operation."},"GeneralError":{"description":"General Error","schema":{"$ref":"#/definitions/example2"}}}'));
  });
  test('Security Definitions render', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: '2.swaggerSrc',
          },
          transform: {
            plugin: 'tokenTemplateValues',
            template: {
              targetPartial: 'securityDefinitions',
            },
          },
          destination: {
            target: 'tempDest',
          },
          templateObject: swagger2Template,
        };
        const testSchemePunk = new SchemePunk(options);
        // Set up schemas:
        const schemas = SchemePunk.createScheme();
        schemas.originalScheme = file;
        schemas.activeScheme = { tempDest: {} };
        schemas.newScheme = { tempDest: {} };

        return testSchemePunk.enhance(schemas);
      })
      .then(result => expect(result.newScheme.tempDest).toEqual('{"api_key":{"type":"apiKey","name":"api_key","in":"header"},"petstore_auth":{"type":"oauth2","authorizationUrl":"http://swagger.io/api/oauth/dialog","flow":"implicit","scopes":{"write.pets":"modify pets in your account","read.pets":"read your pets"}}}'));
  });
  test('Security render', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: '2.swaggerSrc',
          },
          transform: {
            plugin: 'tokenTemplateValues',
            template: {
              targetPartial: 'security',
            },
          },
          destination: {
            target: 'tempDest',
          },
          templateObject: swagger2Template,
        };
        const testSchemePunk = new SchemePunk(options);
        // Set up schemas:
        const schemas = SchemePunk.createScheme();
        schemas.originalScheme = file;
        schemas.activeScheme = { tempDest: {} };
        schemas.newScheme = { tempDest: {} };

        return testSchemePunk.enhance(schemas);
      })
      .then(result => expect(result.newScheme.tempDest).toEqual('{"petstore_auth":["write:pets","read:pets"]}'));
  });
  test('Tags render', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: '2.swaggerSrc',
          },
          transform: {
            plugin: 'tokenTemplateValues',
            template: {
              targetPartial: 'tags',
            },
          },
          destination: {
            target: 'tempDest',
          },
          templateObject: swagger2Template,
        };
        const testSchemePunk = new SchemePunk(options);
        // Set up schemas:
        const schemas = SchemePunk.createScheme();
        schemas.originalScheme = file;
        schemas.activeScheme = { tempDest: {} };
        schemas.newScheme = { tempDest: {} };

        return testSchemePunk.enhance(schemas);
      })
      .then(result => expect(result.newScheme.tempDest).toEqual('[{"name":"pet","description":"Pets operations","externalDocs":{"description":"pet docs","url":"http://example.com/pet"}},{"name":"carrot","description":"Vegetable"}]'));
  });
  test('External Docs render', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: '2.swaggerSrc',
          },
          transform: {
            plugin: 'tokenTemplateValues',
            template: {
              targetPartial: 'externalDocs',
            },
          },
          destination: {
            target: 'tempDest',
          },
          templateObject: swagger2Template,
        };
        const testSchemePunk = new SchemePunk(options);
        // Set up schemas:
        const schemas = SchemePunk.createScheme();
        schemas.originalScheme = file;
        schemas.activeScheme = { tempDest: {} };
        schemas.newScheme = { tempDest: {} };

        return testSchemePunk.enhance(schemas);
      })
      .then(result => expect(result.newScheme.tempDest).toEqual('{"description": "Further api docs", "url": "http://example.com/docs"}'));
  });
  test('Swagger main render', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: '2.swaggerSrc',
          },
          transform: {
            plugin: 'tokenTemplateValues',
          },
          destination: {
            target: 'tempDest',
          },
          templateObject: swagger2Template,
        };
        const testSchemePunk = new SchemePunk(options);
        // Set up schemas:
        const schemas = SchemePunk.createScheme();
        schemas.originalScheme = file;
        schemas.activeScheme = { tempDest: {} };
        schemas.newScheme = { tempDest: {} };

        return testSchemePunk.enhance(schemas);
      })
      .then(result => expect(result.newScheme.tempDest).toEqual('{"swagger": "2.0", "info": { "title": "Swagger Example APi",   "version": "3.14.0", "contact": { "name": "Dave Example", "url": "http://example.com", "email": "example@example.com" }, "license": { "name": "apache 2.0", "url": "http://www.apache.org/licenses/LICENSE-2.0.html"}},   "schemes": ["https","http"],  "consumes": ["vnd.api+json"],  "produces": ["vnd.api+json"],  "paths": {}, "definitions": {"example":{"type":"object","properties":{"id":{"type":"integer","format":"int64"},"name":{"type":"string"}}},"example2":{"type":"object","properties":{"name":{"type":"string"}}}}, "parameters": {"skipParam":{"name":"skip","in":"query","description":"number of items to skip","required":true,"type":"integer","format":"int32"}}, "responses": {"notFound":{"description":"Entity not found."},"IllegalInput":{"description":"Illegal input for operation."},"GeneralError":{"description":"General Error","schema":{"$ref":"#/definitions/example2"}}}, "securityDefinitions": {"api_key":{"type":"apiKey","name":"api_key","in":"header"},"petstore_auth":{"type":"oauth2","authorizationUrl":"http://swagger.io/api/oauth/dialog","flow":"implicit","scopes":{"write.pets":"modify pets in your account","read.pets":"read your pets"}}}, "security": {"petstore_auth":["write:pets","read:pets"]}, "tags": [{"name":"pet","description":"Pets operations","externalDocs":{"description":"pet docs","url":"http://example.com/pet"}},{"name":"carrot","description":"Vegetable"}], "externalDocs": {"description": "Further api docs", "url": "http://example.com/docs"} }'));
  });
});
