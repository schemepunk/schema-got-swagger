// @flow


import type { sgsConfig, configTypes, configNames, userConfigTypes } from './types/swaggerMaker';

// gets default configurations for all schemaGotSwagger options and config.
// require defaults
const fs = require('fs');
const _ = require('lodash');
const yaml = require('js-yaml');
const { SchemaGotSwaggerReThrownError } = require('./SchemaGotSwaggerError');
const { YAML_FILE_LOAD_PROBLEM } = require('./_errors');
// load up yaml.

/**
 * The Configurator class.
 *
 * @class Configurator
 */
class Configurator {
  /**
   * Get Sgs default configs.
   *
   * @returns {Promise<sgsConfig>}
   *   Returns Schema got swagger configurations.
   */
  getSgsDefaults(): Promise<sgsConfig> {
    return this.promiseYamlRetrieval(`${__dirname}/../defaults/sgsConfig.yaml`)
      .then(data => data);
  }

  /**
   * returns various config yaml files as a js object bearing promise.
   *
   * @param {string} fileName
   *   A path filename for the yaml.
   * @returns {Promise<object>}
   *   Returns an object bearing promise.
   */
  promiseYamlRetrieval(fileName: string): Promise<configTypes> {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, (err, data) => {
        if (err) {
          return reject(new SchemaGotSwaggerReThrownError(YAML_FILE_LOAD_PROBLEM, err.message, err)); // eslint-disable-line max-len
        }
        return resolve(yaml.safeLoad(data));
      });
    });
  }

  /**
   *
   *
   * @param {string} configurationType
   *   A type of default config to retrieve.
   * @param {*} implementationConfig
   *   A complete or incomplete set of configuration from the implementation
   *   intending to supplement or override the default configuration.
   * @returns {configTypes}
   *  Will return a configuration that mirrors the passed in configuration Type.
   */
  mergeConfig(configurationType: configNames, implementationConfig: userConfigTypes): Promise<configTypes> { // eslint-disable-line max-len
    // Get the configurationType
    // $FlowFixMe need to figure out indexer for dynamic calls.
    return this[`get${configurationType}Defaults`]()
      .then((data: configTypes) => _.merge(data, implementationConfig));
  }
}

module.exports = new Configurator();
