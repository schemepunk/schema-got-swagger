/**
 * @file directoryToSemverishObject.js
 * Exports an async function that generates a semverist-shaped object from a
 * semverist-shaped directory.
 */

//      
                                                      

const klaw = require('klaw');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');

const { SchemaGotSwaggerError } = require('./SchemaGotSwaggerError');
const {
  SCHEMA_GOT_SWAGGER_SEMVERISH_FILE_READ_ERROR,
  SCHEMA_GOT_SWAGGER_SEMVERISH_CONSTRUCTION_FAILED,
} = require('./_errors');

/**
 * Uses a given semverist-shaped directory to generate a semverist object.
 *
 * @param {string} semverishDirectoryPath
 *   A string representing a file system path to a a semverish directory.
 *
 * @returns {Promise<semverish>}
 *   Promise object that resolves a Semverist-shaped object representing
 *   the given directory structure at {semverishDirectoryPath}.
 */
const directoryToSemverishObject = (semverishDirectoryPath        )                     =>
  new Promise((resolve) => {
    const semverishObject = {};
    const transformers = [];
    let root = false;

    klaw(semverishDirectoryPath, { depthLimit: 4 })
      .on('data', item =>
        // For the given directory or file, add a transform promise.
        transformers.push(new Promise((constResolve) => {
          // If the root path has not yet been set, the first item is the root.
          if (!root) {
            root = item.path;
            return constResolve();
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
            constResolve();
          }
          else {
            const p = path.parse(item.path);
            // Remove the file name from the object path, and replace the path
            // separator with dot notation.
            objPath = `${objPath.replace(p.base, '').replace(pathSep, '.')}['${p.name}']`;

            // Grab this file's content.
            fs.readFile(item.path, 'utf8', (readErr, readData) => {
              if (readErr) {
                throw new SchemaGotSwaggerError(`${SCHEMA_GOT_SWAGGER_SEMVERISH_FILE_READ_ERROR} File path: ${item.path}`); // eslint-disable-line max-len
              }

              // TODO: This should likely be broken into configurable helper,
              // perhaps a mixin so that more file types can be supported.
              _.set(semverishObject, objPath, JSON.parse(readData));
              constResolve();
            });
          }

          return null;
        })))

      // If there were problems walking the fs, throw the error.
      .on('error', (error) => {
        const message = `${SCHEMA_GOT_SWAGGER_SEMVERISH_CONSTRUCTION_FAILED} Error: ${error}`;
        throw new SchemaGotSwaggerError(message);
      })

      // If the semver directory was successfully crawled, execute transform
      // promises and resolve the resulting object.
      .on('end', () => Promise.all(transformers).then(() => resolve(semverishObject)));
  });

module.exports = directoryToSemverishObject;
