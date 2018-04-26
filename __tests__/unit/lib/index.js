'use strict';

const SchemaGotSwagger = require('../../../lib/index');
const { SchemaGotSwaggerError } = require('../../../lib/SchemaGotSwaggerError');
const swaggerMainHelper = require('../../__helpers__/swaggerMainSemverish');

let tmpMocks = [];

const sgsConfig = {
  swaggerVersion: '2.0.0',
  apiType: 'jsonApi',
  sgsType: 'json',
  mergeCOnfig: {
    sgs: true
  }
}

beforeEach(() => {
  tmpMocks.forEach(mock => mock.mockRestore());
  tmpMocks = [];
  jest.resetAllMocks();
  jest.spyOn(Date, 'now').mockReturnValue(2000);
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Config', () => {
  test('set/Get config', () => {
    expect.assertions(1);
    const schemaGotSwagger = new SchemaGotSwagger();
    schemaGotSwagger.config = sgsConfig;
    expect(schemaGotSwagger.getConfig()).toEqual(sgsConfig);
  });
});

describe('Bad Config', () => {
  test('bad config throws', () => {
    expect.assertions(1);
    const schemaGotSwaggerInit = new SchemaGotSwagger();
    return schemaGotSwaggerInit.init(swaggerMainHelper, {}, { dumpydoodle: 'bad', mergeConfig: { sgs: false}})
    .catch(e => expect(e).toBeInstanceOf(SchemaGotSwaggerError));
  })
})

describe('Composer creator errors with bad params', () => {
  test('Bad params throws', () => {
    expect.assertions(1);
    expect(() => SchemaGotSwagger.createComposer('junk', 'junk', 'unk')).toThrow();
  })
})

describe('simple setters and getters', () => {
  const schemaGotSwaggerInit = new SchemaGotSwagger();
  test('set and get mainDataSpClass', () => {
    expect.assertions(2);
    const schemaGotSwagger = new SchemaGotSwagger();
    expect(schemaGotSwagger.setMainDataSpClass('test')).toBeInstanceOf(SchemaGotSwagger)
    expect(schemaGotSwagger.getMainDataSpClass()).toEqual('test');
  });
  test('set and get desired realiztions', () => {
    expect.assertions(2);
    const schemaGotSwagger = new SchemaGotSwagger();
    expect(schemaGotSwagger.setDesiredRealizations(['1.1.0'])).toBeInstanceOf(SchemaGotSwagger)
    expect(schemaGotSwagger.getDesiredRealizations()).toEqual(['1.1.0']);
  });
  test('set and get swaggerTemplatesClass', () => {
    expect.assertions(2);
    const schemaGotSwagger = new SchemaGotSwagger();
    expect(schemaGotSwagger.setSwaggerSrcTemplatesSpClass('test')).toBeInstanceOf(SchemaGotSwagger)
    expect(schemaGotSwagger.getSwaggerSrcTemplatesSpClass()).toEqual('test');
  });
  test('set and get mainSrcSchemesClass', () => {
    expect.assertions(2);
    const schemaGotSwagger = new SchemaGotSwagger();
    expect(schemaGotSwagger.setSwaggerSrcSchemesSpClass('test')).toBeInstanceOf(SchemaGotSwagger)
    expect(schemaGotSwagger.getSwaggerSrcSchemesSpClass()).toEqual('test');
  });
})