/**
 * @file directoryToSemverishObject.js
 * Exports an async function that generates a semverist-shaped object from a
 * semverist-shaped directory.
 */

// @flow
const klaw = require('klaw');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

/**
 * Uses a given semverist-shaped directory to generate a semverist object.
 *
 * @param {string} semverishDirectoryPath
 *   A string representing a file system path to a a semverish directory.
 *
 * @returns {Promise}
 *   Promise object that resolves a Semverist-shaped object representing
 *   the given directory structure at {semverishDirectoryPath}.
 */
const directoryToSemverishObject = (semverishDirectoryPath: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const semverishObject = {};
    let root = false;

    klaw(semverishDirectoryPath, { depthLimit: 4 })
      .on('data', (item) => {
        // If the root path has not yet been set, the first item is the root.
        if (!root) {
          root = item.path;
          return;
        }

        // Parse out the path to this file, relative to the root path.
        let objPath = item.path.replace(`${root}${path.sep}`, '');

        // Create a regexp for identifying all path separators in a string.
        const pathSep = new RegExp(path.sep, 'g');

        // If this path is a directory, just add it as an empty object so that 
        // more sub-directories or files can be added as children.
        if (item.stats.isDirectory()) {
          // Replace the path separator with dot notation.
          objPath = objPath.replace(pathSep, '.');

          _.set(semverishObject, objPath, {});
        }
        else {
          // Extract file name and extension.
          const fname = path.basename(item.path);
          const ext = path.extname(fname);

          // Remove the file name from the object path, and replace the path
          // separator with dot notation.
          objPath = `${objPath.replace(fname, '').replace(pathSep, '.')}['${fname}']`;

          // Grab this file's content.
          let objPathValue = fs.readFileSync(item.path, { encoding: 'utf8' });

          // Parse out data by it's extension.
          // TODO: This should likely be broken into configurable helper,
          // perhaps a mixin so that more file types can be supported.
          if (ext === '.json') {
            objPathValue = JSON.parse(objPathValue);
          }

          _.set(semverishObject, objPath, objPathValue);
        }
      })
      .on('error', reject)
      .on('end', () => {
        resolve(semverishObject);
      });
  });

module.exports = directoryToSemverishObject;
