//      
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
module.exports = function mergeDefaults   (
  passed    = {},
  defaults   
)             {
  if (typeof passed === 'object' && typeof defaults === 'object') {
    return Promise.resolve(_.merge(defaults, passed))
      .then(data => data);
  }
  // $FlowFixMe
  return Promise.resolve(passed);
};

