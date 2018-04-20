'use strict';

const SchemaGotSwagger = require('../../lib/index');
const { SchemaGotSwaggerError } = require('../../lib/SchemaGotSwaggerError');
const swaggerMainHelper = require('../__helpers__/swaggerMainSemverish');

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
    expect.assertions(2);
    const schemaGotSwaggerInit = new SchemaGotSwagger();
    return schemaGotSwaggerInit.init(swaggerMainHelper, {})
    .then(ret => {
      expect(ret).toBeInstanceOf(SchemaGotSwagger);
      expect(ret.getSwaggerSrc()).toMatchSnapshot();
    })
    .catch(e => console.log(e));
  })
})

describe('Bad Config', () => {
  test('bad config throws', () => {
    expect.assertions(1);
    const schemaGotSwaggerInit = new SchemaGotSwagger();
    return schemaGotSwaggerInit.init(swaggerMainHelper, {}, { dumpydoodle: 'bad', mergeConfig: { sgs: false}})
    .catch(e => expect(e).toBeInstanceOf(SchemaGotSwaggerError));
  })
})

describe('Not a semverist shape.', () => {
  test('Non semverist shape throws', () => {
    expect.assertions(1);
    const schemaGotSwaggerInit = new SchemaGotSwagger();
    return schemaGotSwaggerInit.init({nunchuks: 'nope'}, {},)
    .catch(e => expect(e).toBeInstanceOf(SchemaGotSwaggerError));
  })
})

describe('Semverist object maker', () => {
  test('Semverist rocks', () => {
    expect.assertions(1);
    const schemaGotSwagger = new SchemaGotSwagger();
    schemaGotSwagger.setSwaggerSemverRealizations(['1.1.0', '1.1.1', '1.1.0-alpha.0'])
    expect(schemaGotSwagger.semverizeToRealizations('example', {test: 'what'})).toEqual({"1": {"1": {"0": {"alpha.0": {"example": {"test": "what"}}, "example": {"test": "what"}}, "1": {"example": {"test": "what"}}}}});
 })
})