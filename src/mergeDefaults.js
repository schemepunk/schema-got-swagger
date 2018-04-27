// @flow
const _ = require('lodash');
/**
* A configuration merging helper.
*
* @param {(T | {})} passed
*   User provided configuration if available.
* @param {T} defaults
*   Configuration defaults
* @returns {Promise<T>}
*   Returns configuration types.
*/
module.exports = function mergeDefaults<T>(
  passed: * = {},
  defaults: T
): Promise<T> {
  // $FlowFixMe
  return Promise.resolve(_.merge(defaults, passed))
    .then(data => data);
};

