'use strict';

const SchemaGotSwagger = require('../../lib/index');
const { SchemaGotSwaggerError } = require('../../lib/SchemaGotSwaggerError');

let tmpMocks = [];

beforeEach(() => {
  tmpMocks.forEach(mock => mock.mockRestore());
  tmpMocks = [];
  jest.resetAllMocks();
  jest.spyOn(Date, 'now').mockReturnValue(2000);
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Sgs basic gets', () => {
  test('Get config', () => {
    expect.assertions(1);
    const schemaGotSwagger = new SchemaGotSwagger();
    schemaGotSwagger.config = {test: 'test'};
    expect(schemaGotSwagger.getConfig()).toEqual({test:'test'})
  });
});

describe('test initialization', () => {
  test('basic init', () => {
    expect.assertions(1);
    const schemaGotSwaggerInit = new SchemaGotSwagger();
    return schemaGotSwaggerInit.init({}, {})
    .then(ret => expect(ret).toBeInstanceOf(SchemaGotSwagger));
  })
})

describe('Bad Config', () => {
  test('bad config throws', () => {
    expect.assertions(1);
    const schemaGotSwaggerInit = new SchemaGotSwagger();
    return schemaGotSwaggerInit.init({}, {}, { dumpydoodle: 'bad', mergeConfig: { sgs: false}})
    .catch(e => expect(e).toBeInstanceOf(SchemaGotSwaggerError));
  })
})