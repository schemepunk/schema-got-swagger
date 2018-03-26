// @flow

import type {
  userSgsConfig,
  semverish,
  sgsConfig,
  swaggerMakerOptions,
} from './types/swaggerMaker';

const configSchemas = require('./../configSchemas');
const { SchemaGotSwaggerError } = require('./SchemaGotSwaggerError');
const Ajv = require('ajv');
const _ = require('lodash');
const configurator = require('./configurator');

const ajv = new Ajv({
  schemas: [
    configSchemas.sgsConfig,
    configSchemas.semverish,
  ],
}); // e
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
  swaggerSrc: semverish
  pathItemsSrc: semverish
  /**
   * Initializes the SchemaGotSwagger instance with async operations.
   *
   * @param {semverish} swaggerSrc
   *   A swagger source object containing a semver or semverish object
   *   with swagger keys populated with swagger file objects.
   * @param {semverish} pathItemsSrc
   *   A path item source object containing a semver or semverish object
   *   with entity keys populated by json Schema objects representing
   *   those entities.
   * @param {userSgsConfig} config
   *   A schema got swagger configuration object used to configure
   *   this instance of the class SchemaGotSwagger including swagger
   *   version, apiType, etc. By default this will be merged with Sgs defaults.
   * @param {swaggerMakerOptions} swaggerSrcOptions
   *   Optional swagger src options that will affect what and how swagger.json
   *   files are generated.
   * @param {swaggerMakerOptions} pathItemsSrcOptions
   *   Optional path item src options that will affect how swagger path items
   *   are created and processed.
   *
   * @returns {SchemaGotSwagger}
   *   Returns and instance of this.
   */
  init(swaggerSrc: semverish, pathItemsSrc: semverish, config: userSgsConfig = {}, swaggerSrcOptions: swaggerMakerOptions, pathItemsSrcOptions: swaggerMakerOptions) { // eslint-disable-line max-len
    // async operations including validation.
    return this.setConfig(config)
      .then(() => Promise.all([
        this.setSwaggerSrc(swaggerSrc),
      ]))
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

  /**
   * Sets the swagger source for this schemas got swagger instance.
   *
   * @param {swaggerSource} swaggerSrc
   *   A semver or semverish shaped object with swagger source files.
   *
   * @returns {SchemaGotSwagger}
   *   The current instance of this class.
   */
  setSwaggerSrc(swaggerSrc: semverish) {
    // Validate against semverish schema.
    const semveristValidator = ajv.getSchema('http://example.com/schemas/semverish.json');
    const validSemverish = semveristValidator(swaggerSrc);
    if (!validSemverish) throw new SchemaGotSwaggerError(validSemverish.errors);
    this.swaggerSrc = swaggerSrc;
    return this;
  }

  /**
   * Returns the swagger source for this SGS.
   *
   * @returns {swaggerSource}
   *   A semver or semverish shaped object with swagger values.
   */
  getSwaggerSrc(): semverish {
    return this.swaggerSrc;
  }
};
