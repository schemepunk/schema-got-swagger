'use strict';

const configurator = require('../../lib/configurator');
const _ = require('lodash');
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

describe('Configurator', () => {
  test('Get yaml files', () => {
    expect.assertions(1);
    return configurator.getSgsDefaults()
    .then(data => expect(data).toMatchSnapshot())
  });
  test('Bad path throws', () => {
    expect.assertions(1);
    return configurator.promiseYamlRetrieval('notThere')
    .catch(e => expect(e).toBeInstanceOf(SchemaGotSwaggerError));
  })
  test('mergeConfig', () => {
    return configurator.mergeConfig('Sgs', {apiType: 'custom'})
     .then(result => expect(result).toMatchSnapshot());
  })
});
