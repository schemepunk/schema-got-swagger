/**
 * @file directoryToSemverishObject.js
 * Contains definitions for tests of directoryToSemverishObject.js.
 */

const path = require('path');
const directoryToSemverishObject = require('../../lib/directoryToSemverishObject');
const semverishObject = require('../__helpers__/semverishObject.json');

describe('directoryToSemverishObject', () => {
  it ('Can return a semverish object from a given path to a semverish directory', () => {
    directoryToSemverishObject(path.join(__dirname, `../__helpers__/semverishObject`))
      .then((outputObj) => {
        expect(outputObj).toEqual(semverishObject);
      });
  });
});
