const SchemePunk = require('@schemepunk/scheme-punk');
const fs = require('fs');
const yaml = require('js-yaml');
let tmpMocks = [];

const data = new Promise((resolve, reject) => {
  fs.readFile(`${__dirname}/../../examples/swagger-paths-swagger-2-example.yaml`, (err, item) => {
    if (err) {
      return reject(new Error('problem loading swagger src example in templates test.')); // eslint-disable-line max-len
    }
    return resolve(yaml.load(item));
  });
});

const swagger2Template = require('./../../templates/swaggerPaths/2/0/0/paths');

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
  test('Tags', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: 'swaggerPaths.paths[0].operations[1]',
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
      .then(result => expect(result.newScheme.tempDest).toEqual('"tags": ["pet"], '));
  });
  test('Consumes', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: 'swaggerPaths.paths[0].operations[1]',
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
      .then(result => expect(result.newScheme.tempDest).toEqual('"consumes": ["application/x-www-form-urlencoded"], '));
  });
  test('Produces', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: 'swaggerPaths.paths[0].operations[1]',
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
      .then(result => expect(result.newScheme.tempDest).toEqual('"produces": ["application/json","application/xml"], '));
  });
  test('Empty Schemes produces emptyArray', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: 'swaggerPaths.paths[0].operations[1]',
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
      .then(result => expect(result.newScheme.tempDest).toEqual('"schemes": [], '));
  });
  test('Security', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: 'swaggerPaths.paths[0].operations[1]',
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
      .then(result => expect(result.newScheme.tempDest).toEqual('"security": [{"petstore_auth":["write:pets","read:pets"]}],'));
  });
  test('Responses', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: 'swaggerPaths.paths[0].operations[1]',
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
      .then(result => expect(result.newScheme.tempDest).toEqual('{"200":{"description":"Pet updated."},"405":{"description":"Invalid input"}}'));
  });
  test('Destination', () => {
    expect.assertions(1);
    // return file
    return data
      .then((file) => {
        // Set up scheme options
        const options = {
          source: {
            plugin: 'originalSchemeSource',
            target: 'swaggerPaths',
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
      .then(result => expect(result.newScheme.tempDest).toEqual('{ "paths":{ "/pets": {   "parameters":[],"get": { "tags":  [], "summary": "Find pets by ID", "description": "Returns pets based on ID", "externalDocs": {}, "operationId": "getPetsById",   "consumes": [],  "produces": ["application/json","text/html"],  "parameters": [{"name":"id","in":"path","description":"ID of pet to use","required":true,"type":"array","items":{"type":"string"},"collectionFormat":"csv"}], "schemes": [],  "security": {}, "responses": {"200":{"description":"pet response","schema":{"type":"array","items":null,"$ref":"#/definitions/Pet"}},"default":{"description":"error payload","schema":{"$ref":"#/definitions/ErrorModel"}}} },"put": { "tags": ["pet"],  "summary": "Updates a pet in the store with form data",  "externalDocs": {}, "operationId": "updatePetWithForm",   "consumes": ["application/x-www-form-urlencoded"],  "produces": ["application/json","application/xml"],  "parameters": [{"name":"petId","in":"path","description":"ID of pet that needs to be updated","required":true,"type":"string"},{"name":"name","in":"formData","description":"Updated name of the pet","required":false,"type":"string"},{"name":"status","in":"formData","description":"Updated status of the pet","required":false,"type":"string"}], "schemes": [],  "security": [{"petstore_auth":["write:pets","read:pets"]}], "responses": {"200":{"description":"Pet updated."},"405":{"description":"Invalid input"}} }}}, "definitions": {}  }'));
  });
});
