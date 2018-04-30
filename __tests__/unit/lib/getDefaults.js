const GetDefaults = require('./../../../lib/GetDefaults');
const _ = require('lodash');
const { SchemaGotSwaggerError, SchemaGotSwaggerReThrownError } = require('./../../../lib/SchemaGotSwaggerError');

let tmpMocks = [];

describe('Get Defaults Unit', () => {
  beforeEach(() => {
    tmpMocks.forEach(mock => mock.mockRestore());
    tmpMocks = [];
    jest.resetAllMocks();
    jest.spyOn(Date, 'now').mockReturnValue(2000);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  test('Problem with fs will throw.', () => {
    expect.assertions(1);
    const getDefaults = new GetDefaults('SwaggerMainTemplates', '2.0.0');
    return getDefaults.promiseYamlRetrieval('nope')
      .catch(e => expect(e).toBeInstanceOf(SchemaGotSwaggerReThrownError))
  });
});