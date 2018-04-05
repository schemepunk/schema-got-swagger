/**
 * @file directoryToSemverishObject.js
 * Contains definitions for tests of directoryToSemverishObject.js.
 */

const path = require('path');
const directoryToSemverishObject = require('../../lib/directoryToSemverishObject');

describe('directoryToSemverishObject', () => {
  test('Can return a semverish object from a given path to a semverish directory', () => {
    expect.assertions(1);
    return directoryToSemverishObject(path.join(__dirname, `../__helpers__/semverishObject`))
      .then((outputObj) => {
        expect(outputObj).toMatchSnapshot();
      });
  });
});
