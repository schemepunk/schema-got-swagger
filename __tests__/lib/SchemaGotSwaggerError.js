'use strict';

const { SchemaGotSwaggerError, SchemaGotSwaggerReThrownError } = require('../../lib/SchemaGotSwaggerError');

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

describe('SchemaGotSwaggerError', () => {
  test('SchemaGotSwagger Error instance is correct', () => {
    expect.assertions(1);
    expect(new SchemaGotSwaggerError('error')).toBeInstanceOf(SchemaGotSwaggerError);
  });
  test('SchemaGotSwagger Rethrown no Error passed throws normal error.', () => {
    expect.assertions(1);
    expect(() => new SchemaGotSwaggerReThrownError('a code', 'a message')).toThrowError('A rethrown Schema Got Swagger error requires a message and error');
  })
});
