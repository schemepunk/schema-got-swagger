'use strict';

const mergeDefaults = require('../../../lib/mergeDefaults');
const { SchemaGotSwaggerError } = require('../../lib/SchemaGotSwaggerError');

describe('Merge Defaults', () => {
  test('Merge', () => {
    expect.assertions(1);
    return mergeDefaults({two: 'this is overrides'}, {one: 'example', two: 'will be overridden'})
    .then((val) => expect(val).toEqual({"one": "example", "two": "this is overrides"}));
  });
  test('Merge null', () => {
    expect.assertions(1);
    return mergeDefaults(undefined, {one: 'example', two: 'will be overridden'})
    .then((val) => expect(val).toEqual({"one": "example", "two": "will be overridden"}));
  });
});
