'use strict';

const GetDefaults = require('../../../lib/GetDefaults');
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

describe('Get Defaults', () => {
  test('Get existing yaml file', () => {
    expect.assertions(1);
    const getDefaults = new GetDefaults('Sgs');
    return getDefaults.getDefaults()
    .then(data => expect(data).toMatchSnapshot());
  });
  test('Get function based defaults', () => {
    expect.assertions(1);
    const getDefaults = new GetDefaults('SwaggerMainTemplates', '2.0.0');
    return getDefaults.getDefaults()
    .then(data => expect(data).toMatchSnapshot());
  });
  test('Get function based defaults', () => {
    expect.assertions(1);
    expect(() => new GetDefaults('nope')).toThrow();
  });
});
