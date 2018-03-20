// @flow

import type { pathItemSource, userSgsConfig, sgsConfig, swaggerSource } from './types/swaggerMaker';

const configSchemas = require('./../configSchemas');
const { SchemaGotSwaggerError } = require('./SchemaGotSwaggerError');
const Ajv = require('ajv');
const _ = require('lodash');
const configurator = require('./configurator');

const ajv = new Ajv({ schemas: [configSchemas.sgsConfig] }); // options can be passed, e.g. {allErrors: true}
const sgsValidator = ajv.getSchema('http://example.com/schemas/sgsConfig.json');

// compile config schemas.
// need a class that provides defaults

// basically want to get to a place where you can:

// 1) only pass in the options and items src and main src

// 3) pass in config for items

// 4) additionally pass in config for swagger src.

// Class that handles swagger main file

module.exports = class SchemaGotSwagger {
  config: sgsConfig
  /**
   * Initializes the SchemaGotSwagger instance with async operations.
   *
   * @param {swaggerSource} swaggerSrc
   *   A swagger source object containing a semver or semverish object
   *   with swagger keys populated with swagger file objects.
   * @param {pathItemSource} pathItemsSrc
   *   A path item source object containing a semver or semverish object
   *   with entity keys populated by json Schema objects representing
   *   those entities.
   * @param {userSgsConfig} config
   *   A schema got swagger configuration object used to configure
   *   this instance of the class SchemaGotSwagger including swagger
   *   version, apiType, etc. By default this will be merged with Sgs defaults.
   * @param {any} swaggerSrcOptions
   *   Optional swagger src options that will affect what and how swagger.json
   *   files are generated.
   * @param {any} pathItemsSrcOptions
   *   Optional path item src options that will affect how swagger path items
   *   are created and processed.
   *
   * @returns {SchemaGotSwagger}
   *   Returns and instance of this.
   */
  init(swaggerSrc: swaggerSource, pathItemsSrc: pathItemSource, config: userSgsConfig = {}, swaggerSrcOptions: *, pathItemsSrcOptions: *) { // eslint-disable-line max-len
    // async operations including validation.
    return Promise.all([this.setConfig(config)])
      .then(() => this);
  }

  /**
   * Set config for this schema got swagger instance.
   *
   * @param {sgsConfig} config
   *   Swagger got style configuration.
   * @return {SchemaGotSwagger} the instance of this class.
   */
  setConfig(config: userSgsConfig): Promise<SchemaGotSwagger> {
    const tmpMerge = _.get(config, ['mergeConfig', 'sgs'], true);
    // Merge config with defaults.
    let tmpConfig = Promise.resolve(config);
    if (tmpMerge) {
      tmpConfig = configurator.mergeConfig('Sgs', config)
        .then(mergedConfig => mergedConfig);
    }
    return tmpConfig
      .then((finalConfig) => {
        const validConfig: sgsConfig = sgsValidator(finalConfig);
        if (!validConfig) throw new SchemaGotSwaggerError(validConfig.errors);
        this.config = validConfig;
        return this;
      });
  }

  /**
   * @returns {sgsConfig}
   *   Returns the Schema got swagger config for this instance.
   */
  getConfig(): sgsConfig {
    return this.config;
  }
};
