// @flow


import type { semveristConfig } from './types/semveristConfig';
import type { sgsConfig, configTypes, configNames, mainTemplate, userConfigTypes } from './types/swaggerMaker';

// gets default configurations for all schemaGotSwagger options and config.
// require defaults
const fs = require('fs');
const _ = require('lodash');
const yaml = require('js-yaml');
const { SchemaGotSwaggerReThrownError } = require('./SchemaGotSwaggerError');
const { YAML_FILE_LOAD_PROBLEM } = require('./_errors');
const swaggerMainTemplates = require('./../templates/swaggerSrc');
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
  getSgsDefaults(): Promise<configTypes> {
    return this.promiseYamlRetrieval(`${__dirname}/../defaults/sgsConfig.yaml`)
      .then(data => data);
  }

  /**
   * Get swaggerSrc semverist default configs.
   *
   * @returns {Promise<semveristConfig>}
   *   Returns semverist config defaults for swagger src.
   * @memberof Configurator
   */
  getSwaggerSrcSemveristDefaults(): Promise<configTypes> {
    return this.promiseYamlRetrieval(`${__dirname}/../defaults/swaggerSrcSemverist.yaml`)
      .then(data => data);
  }

  /**
   * Get the swagger Src Scheme
   *
   * @returns {Promise<configTypes>}
   *   Returns a schemepunk scheme for processing the swagger main src files.
   * @memberof Configurator
   */
  getSwaggerSrcSchemesDefaults(): Promise<configTypes> {
    return this.promiseYamlRetrieval(`${__dirname}/../defaults/swaggerSrcSchemesSemverist.yaml`)
      .then(data => data);
  }

  /**
   * Get the swagger src templates semverist config.
   *
   * @returns {Promise<configTypes>}
   *   A semverist config for any templates semverist.
   * @memberof Configurator
   */
  getSwaggerSrcTemplatesSemveristDefaults(): Promise<configTypes> {
    return this.promiseYamlRetrieval(`${__dirname}/../defaults/swaggerSrcTemplatesSemverist.yaml`)
      .then(data => data);
  }

  /**
   * Gets the main swaggerSrc template defaults.  This is not a yaml
   *   file but a js file and the pathing is a little different.
   *
   * @param {string} swaggerVersion
   *   A semver string representing the swagger version.
   * @returns {Promise<mainTemplate>}
   *   A swagger template appropriate to the version of swagger
   *   you are targeting.
   * @memberof Configurator
   */
  getSwaggerMainTemplateDefaults(swaggerVersion: string): Promise<mainTemplate> {
    return Promise.resolve(_.get(
      swaggerMainTemplates,
      `swagger_${swaggerVersion.split('.').join('_')}`,
      swaggerMainTemplates.swagger_2_0_0
    ))
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
