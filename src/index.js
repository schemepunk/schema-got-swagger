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
const {
  SCHEMA_GOT_SWAGGER_CONFIG_VALIDATION_ERROR,
} = require('./_errors');
const {
  SchemaGotSwaggerError,
} = require('./SchemaGotSwaggerError');
const Ajv = require('ajv');
const semver = require('semver');
const _ = require('lodash');
const configurator = require('./configurator');
const semverist = require('semverist');

const ajv = new Ajv({
  schemas: [
    configSchemas.schemePunkConfig,
    configSchemas.sgsConfig,
    configSchemas.semverish,
    configSchemas.semverishMainData,
    configSchemas.swaggerMainTemplates,
    configSchemas.semveristConfig,
  ],
}); // e
const sgsValidator = ajv.getSchema('http://example.com/schemas/sgsConfig.json');
const swaggerMainSemveristSrcValidator = ajv.getSchema('http://example.com/schemas/semverishMainData.json');
const semveristConfigValidator = ajv.getSchema('http://example.com/schemas/semveristConfig.json');
const templateValidator = ajv.getSchema('http://example.com/schemas/swaggerMainTemplate.json');
const schemePunkValidator = ajv.getSchema('http://example.com/schemas/schemePunkConfig.json');
const semverishValidator = ajv.getSchema('http://example.com/schemas/semverish.json');

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
  swaggerMainSemveristSchemesConfig: semveristConfig
  pathItemsSrc: semverish
  swaggerMainSemveristTemplatesConfig: semveristConfig
  swaggerSemverRealizations: Array<string>
  swaggerMainSemveristSrcMolotov: {}
  swaggerMainTemplateMolotov: {}
  swaggerMainSchemesMolotov: {
    schemes: {},
    semverist: {}
  }

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
  init(swaggerSrc: semverishSrc, pathItemsSrc: semverish, config: userSgsConfig = {}, swaggerSrcOptions?: mainSwaggerMakerOptions, pathItemsSrcOptions: pathSwaggerMakerOptions) { // eslint-disable-line max-len
    // async operations including validation.
    return this.setConfig(config)
      .then(() => Promise.all([
        this.setSwaggerSrc(swaggerSrc),
      ]))
      .then(() => {
        if (swaggerSrcOptions) {
          return this.setSwaggerSrcConfig(swaggerSrcOptions);
        }
        return this.setSwaggerSrcConfig({});
      })
      .then(() => SchemaGotSwagger.createComposer(
        this.getSwaggerSrc(),
        { swaggerMain: this.getSwaggerMainSemveristSrcConfig() },
        'swaggerMain',
        this.getSwaggerMainSemveristSrcMolotov()
      ))
      .then((mainSwaggerComposer) => {
        this.setMainSwaggerComposer(mainSwaggerComposer);
        // $FlowFixMe - need better defs for composer.
        this.setSwaggerSemverRealizations(this.getMainSwaggerComposer().getConverterClass().getSemverRealizations()); // eslint-disable-line max-len
        return this;
      })
      .then(() => this)
      // Now set templates and templates composer (need to write setters)
      // Now set schemes and schemes composer (need to write setters)
      // return this;
      .then(() => {
        // Add templates and holdovers to scheme
        // now run schemePunk for all the main swagger semverist to produce
      })
      .then(() => this);
  }

  /**
   * Takes value and places it at all semverRealizations for this
   *   SGS under the given name.  This can be useful in creating semver
   *   objects that contain default objects like templates or schemePunk
   *   schemes.
   * @param {*} targetValue
   *   A value to assign to the targetName attribute at all terminal
   *   semver realizations.
   *
   * @param {string} targetName
   *   An attribute name

   * @returns {semverish}
   *   A semver shape with related attributes.
   */
  semverizeToRealizations(targetValue: *, targetName?: string = '') {
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
   * Semverize parameters provides a uniform way to test parameters in
   *   config because we can have 3 kinds.
   *   1) nothing - meaning we should use defaults.
   *   2) a semverish shape that a implementer is passing - meaning they have
   *      explicit plans for whatever the parameter is and we should
   *       pass through.
   *   3) a valid parameter type to override the default.
   *
   * @param {(('swaggerMainTemplate' | 'schemePunkConfig'))} sgsDefaultType
   *   The parameter type to validate against.
   * @param {{}} value
   *   The value of the parameter we wish to semverize.
   * @param {semveristConfig} semveristConfiguration
   *   Semverist configuration for this parameter if needed.
   * @param {molotovConfig} semveristMolotov
   *   Any applicable molotov config for this semverist.
   * @returns {Promise<{}>}
   *   Returns a semverized version of the passed parameter type/value.
   */
  semverizeParameters(
    sgsDefaultType: ('swaggerMainTemplate' | 'SwaggerSrcSchemes'),
    value: {},
    semveristConfiguration: semveristConfig,
    semveristMolotov: molotovConfig
  ) {
    let makeSemverish = true;
    let tmpValue;
    if (value) {
      // Determine if the value is a semverish.
      const parameterIsSemverish = semverishValidator(tmpValue);
      if (parameterIsSemverish) {
        makeSemverish = false;
      }
    }
    // Otherwise use configurator with value to get merged defaults.

    if (makeSemverish) {
      // Now make semverish.
      tmpValue = this.mergeConfig(value, sgsDefaultType, this.getConfig())
        .then(preparedParameter => this.semverizeToRealizations(preparedParameter, 'swagger'));
    }
    else {
      // This is either a semverist shape or semverish.
      // So we should run semverist on it and get back
      // the realized semver shape.
      tmpValue = SchemaGotSwagger.createComposer(
        value,
        { swaggerParam: semveristConfiguration },
        'swaggerParam',
        semveristMolotov
      );
    }
    return tmpValue;
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
        if (!validConfig) {
          throw new SchemaGotSwaggerError(`${SCHEMA_GOT_SWAGGER_CONFIG_VALIDATION_ERROR} ${validConfig.errors}`); // eslint-disable-line max-len
        }
        this.config = validConfig;
        return this;
      })
      .catch(e => Promise.reject(e));
  }

  /**
   * @returns {sgsConfig}
   *   Returns the Schema got swagger config for this instance.
   */
  getConfig(): sgsConfig {
    return this.config;
  }

  /**
   * Set configs for main swagger src production.
   *
   * @param {mainSwaggerMakerOptions} swaggerSourceOptions
   *   A swagger src options parameter containing all src options.
   * @returns {SchemaGotSwagger}
   *   Returns and instance of this.
   */
  setSwaggerSrcConfig(swaggerSourceOptions: (mainSwaggerMakerOptions | {}) = {}) {
    const mainSwaggerSourceConfig = _.get(swaggerSourceOptions, ['data', 'semveristConfig'], {});
    const mainSwaggerTemplatesConfig = _.get(swaggerSourceOptions, ['templates', 'semveristConfig'], {});
    const mainSwaggerSchemesConfig = _.get(swaggerSourceOptions, ['schemes', 'semveristConfig'], {});
    const mainSemveristSrcMolotov = _.get(swaggerSourceOptions, ['data', 'semveristMolotovOptions'], {});
    const mainSwaggerTemplatesMolotov = _.get(swaggerSourceOptions, ['templates', 'semveristMolotovOptions'], {});
    const mainSwaggerSchemesSemveristMolotov = _.get(swaggerSourceOptions, ['schemes', 'semveristMolotovOptions'], {});
    const mainSwaggerSchemesSchemePunkMolotov = _.get(swaggerSourceOptions, ['schemes', 'schemePunkMolotovOptions'], {});
    // Set all semverist configs.
    // main swagger src config
    // templates src config
    // schema src config
    return this.setSwaggerMainSemveristSrcConfig(mainSwaggerSourceConfig)
      .then(() => this.setSwaggerMainSemveristTemplatesConfig(mainSwaggerTemplatesConfig))
      .then(() => this.setSwaggerMainSemveristSchemesConfig(mainSwaggerSchemesConfig))
      .then(() => {
        this.setSwaggerMainSemveristSrcMolotov(mainSemveristSrcMolotov)
          .setSwaggerMainTemplatesMolotov(mainSwaggerTemplatesMolotov)
          .setSwaggerMainSchemesMolotov(
            mainSwaggerSchemesSemveristMolotov,
            mainSwaggerSchemesSchemePunkMolotov
          );
        return this;
      })
      .catch(e => Promise.reject(e));
  }

  /**
   * A default molotov settings provider.
   *
   * @param {{}} molotovValue
   *   A molotov value or empty object.
   * @returns {{}}
   *   A molotov config default values object.
   */
  molotovTester(molotovValue: {}) {
    let tmp = molotovValue;
    if (!Object.keys(tmp).length) {
      tmp = {
        overrides: {},
        cocktailClasses: [],
      };
    }
    return tmp;
  }
  /**
   * Sets swagger main semverist molotov config.
   *
   * @param {{}} semveristMolotov
   *   A molotov config
   * @returns {SchemaGotSwagger}
   *   returns an instance of this.
   */
  setSwaggerMainSemveristSrcMolotov(semveristMolotov: {}) {
    this.swaggerMainSemveristSrcMolotov = this.molotovTester(semveristMolotov);
    return this;
  }

  /**
   * Returns the swagger main semverist molotov config.
   *
   * @returns {{}}
   *   Returns a molotov config.
   */
  getSwaggerMainSemveristSrcMolotov() {
    return this.swaggerMainSemveristSrcMolotov;
  }

  /**
   * Sets swagger main semverist template molotov config.
   *
   * @param {{}} semveristMolotov
   *   A molotov config
   * @returns {SchemaGotSwagger}
   *   returns an instance of this.
   */
  setSwaggerMainTemplatesMolotov(semveristMolotov: {}) {
    this.swaggerMainTemplateMolotov = this.molotovTester(semveristMolotov);
    return this;
  }

  /**
   * Returns the swagger main templates molotov config.
   *
   * @returns {{}}
   *   Returns a molotov config.
   */
  getSwaggerMainTemplatesMolotov() {
    return this.swaggerMainTemplateMolotov;
  }
  /**
   * Sets swagger main semverist molotov config.
   *
   * @param {{}} semveristMolotov
   *   A molotov config
   * @param {{}} schemesMolotov
   *   A molotov config
   * @returns {SchemaGotSwagger}
   *   returns an instance of this.
   */
  setSwaggerMainSchemesMolotov(semveristMolotov: {}, schemesMolotov: {}) {
    this.swaggerMainSchemesMolotov = {
      semverist: this.molotovTester(semveristMolotov),
      schemes: this.molotovTester(schemesMolotov),
    };
    return this;
  }
  /**
   * Returns the swagger main schemes molotov config.
   * @param {("semverist" | "schemes")} type
   *   A type of molotov config you want to return.
   * @returns {{}}
   *   Returns a molotov config.
   */
  getSwaggerMainSchemesMolotov(type: ("semverist" | "schemes")) {
    return this.swaggerMainSchemesMolotov[type];
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
      })
      .catch(e => Promise.reject(e));
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
   * Gets the semverist config for main swagger templates.
   *
   * @param {semveristConfig} swaggerMainSemveristTemplatesConfig
   *   The passed semverist config.
   * @returns {Promise<SchemaGotSwagger>}
   *   The semverist config for main swagger templates.
   */
  setSwaggerMainSemveristTemplatesConfig(swaggerMainSemveristTemplatesConfig: Promise<SchemaGotSwagger>) {
    return this.mergeConfig(
      swaggerMainSemveristTemplatesConfig,
      'SwaggerSrcTemplatesSemverist',
      this.getConfig()
    )
      .then((finalConfig) => {
        const validConfig: semveristConfig = semveristConfigValidator(finalConfig);
        if (!validConfig) throw new SchemaGotSwaggerError(validConfig.errors);
        this.swaggerMainSemveristTemplatesConfig = finalConfig;
        return this;
      })
      .catch(e => Promise.reject(e));
  }

  /**
   * Get the semverist config for the swagger main templates.
   *
   * @returns {semveristConfig}
   *   Returns the semverist config for swagger main templates.
   */
  getSwaggerMainSemveristTemplatesConfig() {
    return this.swaggerMainSemveristTemplatesConfig;
  }

  /**
   * Sets the default or overrides for the semverist config
   *   for the main swagger schemes.
   *
   * @param {semveristConfig} swaggerMainSemveristSchemesConfig
   *   A semverist config.
   * @returns {Promise<SchemaGotSwagger>}
   *   An instance of this.
   */
  setSwaggerMainSemveristSchemesConfig(swaggerMainSemveristSchemesConfig: semveristConfig): Promise<SchemaGotSwagger> {
    return this.mergeConfig(
      swaggerMainSemveristSchemesConfig,
      'SwaggerSrcSchemes',
      this.getConfig()
    )
      .then((finalConfig) => {
        const validConfig: semveristConfig = semveristConfigValidator(finalConfig);
        if (!validConfig) throw new SchemaGotSwaggerError(validConfig.errors);
        this.swaggerMainSemveristSchemesConfig = finalConfig;
        return this;
      })
      .catch(e => Promise.reject(e));
  }

  /**
   * Returns the semverist config for the main schemes.
   * @returns {semveristConfig}
   *   Returns the semverist config for the main schemes.
   */
  getSwaggerMainSemveristSchemesConfig() {
    return this.swaggerMainSemveristSchemesConfig;
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
    if (!validSemverish) throw new SchemaGotSwaggerError(validSemverish.err);
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
