// @flow

import type { molotovConfig } from 'molotov/lib/types/molotov';

import type {
  configNames,
  configTypes,
  molotovConfigDefaults,
  userSgsConfig,
  semverish,
  semverishSrc,
  sgsConfig,
  mainSwaggerMakerOptions,
  pathSwaggerMakerOptions,
  userConfigTypes,
} from './types/swaggerMaker';

import type { semveristConfig } from './types/semveristConfig';

const configSchemas = require('./../configSchemas');
const { SchemaGotSwaggerError } = require('./SchemaGotSwaggerError');
const Ajv = require('ajv');
const semver = require('semver');
const _ = require('lodash');
const configurator = require('./configurator');
const semverist = require('semverist');

const ajv = new Ajv({
  schemas: [
    configSchemas.sgsConfig,
    configSchemas.semverish,
    configSchemas.semverishMainData,
    configSchemas.semveristConfig,
  ],
}); // e
const sgsValidator = ajv.getSchema('http://example.com/schemas/sgsConfig.json');
const swaggerMainSemveristSrcValidator = ajv.getSchema('http://example.com/schemas/semverishMainData.json');
const semveristConfigValidator = ajv.getSchema('http://example.com/schemas/semveristConfig.json');

// compile config schemas.
// need a class that provides defaults

// basically want to get to a place where you can:

// 1) only pass in the options and items src and main src

// 3) pass in config for items

// 4) additionally pass in config for swagger src.

// Class that handles swagger main file

module.exports = class SchemaGotSwagger {
  config: sgsConfig
  mainSwaggerComposer: {}
  swaggerSrc: semverishSrc
  swaggerMainSemveristSrcConfig: semveristConfig
  pathItemsSrc: semverish
  swaggerSemverRealizations: Array<string>

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
   * @param {(swaggerMakerOptions | molotovConfigDefaults)} swaggerSrcOptions
   *   Optional swagger src options that will affect what and how swagger.json
   *   files are generated.
   * @param {(swaggerMakerOptions | molotovConfigDefaults)} pathItemsSrcOptions
   *   Optional path item src options that will affect how swagger path items
   *   are created and processed.
   *
   * @returns {SchemaGotSwagger}
   *   Returns and instance of this.
   */
  init(swaggerSrc: semverishSrc, pathItemsSrc: semverish, config: userSgsConfig = {}, swaggerSrcOptions: (mainSwaggerMakerOptions | {}) = {}, pathItemsSrcOptions: pathSwaggerMakerOptions) { // eslint-disable-line max-len
    // async operations including validation.
    return this.setConfig(config)
      .then(() => Promise.all([
        this.setSwaggerSrc(swaggerSrc),
      ]))
      .then(() => {
        const tmpSrcOptions = _.get(swaggerSrcOptions, ['data', 'semveristConfig'], {});
        return this.setSwaggerMainSemveristSrcConfig(tmpSrcOptions);
      })
      .then(() => SchemaGotSwagger.createComposer(
        this.getSwaggerSrc(),
        { swaggerMain: this.getSwaggerMainSemveristSrcConfig() },
        'swaggerMain',
        _.get(swaggerSrcOptions, ['data', 'semveristMolotovOptions'], {
          overrides: {},
          cocktailClasses: [],
        })
      ))
      .then((mainSwaggerComposer) => {
        this.setMainSwaggerComposer(mainSwaggerComposer);
        // $FlowFixMe - need better defs for composer.
        this.setSwaggerSemverRealizations(this.getMainSwaggerComposer().getConverterClass().getSemverRealizations()); // eslint-disable-line max-len
        return this;
      })
      .then(() => this);
  }


  /**
   * Takes value and places it at all semverRealizations for this
   *   SGS under the given name.  This can be useful in creating semver
   *   objects that contain default objects like templates or schemePunk
   *   schemes.
   *
   * @param {string} targetName
   *   An attribute name
   * @param {*} targetValue
   *   A value to assign to the targetName attribute at all terminal
   *   semver realizations.
   *
   * @returns {semverish}
   *   A semver shape with related attributes.
   */
  semverizeToRealizations(targetName: string, targetValue: *) {
    const realizations = this.getSwaggerSemverRealizations();
    let targetInjectedSemver = {};
    realizations.forEach((semverNum) => {
      const parsed = semver.parse(semverNum);
      const writeToAttributes = _.concat(
        [],
        parsed.major.toString(),
        parsed.minor.toString(),
        parsed.patch.toString(),
        parsed.prerelease.join('.'),
        targetName,
      );
      targetInjectedSemver = _.setWith(
        targetInjectedSemver,
        _.without(writeToAttributes, ''),
        _.cloneDeep(targetValue),
        Object
      );
    });

    return targetInjectedSemver;
  }

  /**
   * Sets the swagger realizations for our swagger files
   *   this is limited by the swagger main data.
   *
   * @param {Array<string>} realizationsArray
   *   An array of semver numbers that represent
   *   all of the full semver values realized by
   *   the semverist for the main swagger data.
   *
   * @returns {SchemaGotSwagger}
   *   Returns an instance of this.
   */
  setSwaggerSemverRealizations(realizationsArray: Array<string>) {
    this.swaggerSemverRealizations = realizationsArray;
    return this;
  }

  /**
   * Gets the swagger realizations for our swagger main data files.
   *
   * @returns {Array<string>}
   *   An array of semver numbers that represent
   *   all of the full semver values realized by
   *   the semverist for the main swagger data.
   */
  getSwaggerSemverRealizations(): Array<string> {
    return this.swaggerSemverRealizations;
  }

  /**
   * Set config for this schema got swagger instance.
   *
   * @param {sgsConfig} config
   *   Swagger got style configuration.
   * @return {SchemaGotSwagger} the instance of this class.
   */
  setConfig(config: userSgsConfig): Promise<SchemaGotSwagger> {
    return this.mergeConfig(config, 'Sgs', config)
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
   * Sets the swagger main semverist config.
   * @param {semveristConfig} swaggerMainSemveristConfig
   *   A semverist config.
   *
   * @returns {Promise<SchemaGotSwagger>}
   * Returns the instance of this class.
   */
  setSwaggerMainSemveristSrcConfig(swaggerMainSemveristConfig: semveristConfig) {
    return this.mergeConfig(swaggerMainSemveristConfig, 'SwaggerSrcSemverist', this.getConfig())
      .then((finalConfig) => {
        const validConfig: semveristConfig = semveristConfigValidator(finalConfig);
        if (!validConfig) throw new SchemaGotSwaggerError(validConfig.errors);
        this.swaggerMainSemveristSrcConfig = finalConfig;
        return this;
      });
  }

  /**
   * Gets the semverist config for the main swagger src semverist object.
   *
   * @returns {semveristConfig}
   *   The semverist config for the main swagger src file.
   */
  getSwaggerMainSemveristSrcConfig(): semveristConfig {
    return this.swaggerMainSemveristSrcConfig;
  }

  /**
   * Sets the Swagger Composer Object for the main swagger data src..
   *
   * @param {object} swaggerComposer
   *   A semverist composer object.
   *
   * @returns {SchemaGotSwagger}
   *   Returns an instance of this.
   *
   */
  setMainSwaggerComposer(swaggerComposer: {}) {
    this.mainSwaggerComposer = swaggerComposer;
    return this;
  }

  /**
   * Gets the main swagger file composer.
   *
   * @returns {{}}
   *   Returns a composer class for the main swagger data src.
   */
  getMainSwaggerComposer(): {} {
    return this.mainSwaggerComposer;
  }

  /**
   * A configuration merging helper for sgs config.
   *
   * @param {userConfigTypes} config
   *   User provided configuration if available.
   * @param {configNames} configName
   *   The name of the config to examine for merging preferences.
   * @param {userSgsConfig} sgsProvidedConfig
   *   Sgs config which contains merging instructions.
   * @returns {Promise<configTypes>}
   *   Returns configuration types.
   */
  mergeConfig(
    config: *,
    configName: configNames,
    sgsProvidedConfig: (userSgsConfig | sgsConfig)
  ): Promise<*> {
    // Check to see if we've been told to merge this config.
    const tmpMerge: boolean = _.get(sgsProvidedConfig, ['mergeConfig', configName.toLowerCase()], true); // eslint-disable-line max-len
    // Set up a promise return.
    let tmpConfig = Object.keys(config).length ? Promise.resolve(config) : Promise.resolve({}); // eslint-disable-line max-len
    if (tmpMerge) {
      tmpConfig = configurator.mergeConfig(configName, config)
        .then(mergedConfig => mergedConfig);
    }
    // $FlowFixMe This is probably a dynamic call issue.
    return tmpConfig;
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
    const semveristValidator = ajv.getSchema('http://example.com/schemas/semverishMainData.json');
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

  /**
   * A static composer creator to supply the preprocess class.
   *
   * @static
   * @param {string|Object} semverishSource - A path string or
   *   semverish Object.
   * @param {semveristConfig} config - A semverist config object.
   * @param {string} nameSpace  - the name of the property within
   *   the semverist config object that will be used for this composer.
   * @param {(molotovConfig | molotovConfigDefaults)} semveristMolotovOptions
   *   molotov options for the semverist we are creating.
   * @returns {Object} - A semverist composer class.
   */
  static createComposer(
    semverishSource: semverishSrc,
    config: { [string]: semveristConfig },
    nameSpace: string,
    semveristMolotovOptions: (molotovConfig | molotovConfigDefaults)
  ) {
    return semverist.composer(
      semverishSource,
      config,
      nameSpace,
      semveristMolotovOptions
    )
      .then((composer) => {
        composer.assembleManifest();
        return composer;
      })
      .catch(err => Promise.reject(err));
  }
};
