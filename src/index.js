// @flow

import type {
  userSgsConfig,
  semverish,
  semverishSrc,
  sgsConfig,
  mainSwaggerMakerOptions,
  pathSwaggerMakerOptions,
  schemePunkScheme,
  swaggerMainData,
  mainTemplate,
} from './types/swaggerMaker';

const configSchemas = require('./../configSchemas');
const {
  SCHEMA_GOT_SWAGGER_CONFIG_VALIDATION_ERROR,
} = require('./_errors');
const {
  SchemaGotSwaggerError,
} = require('./SchemaGotSwaggerError');
const Ajv = require('ajv');
const GetDefaults = require('./getDefaults');
const mergeDefaults = require('./mergeDefaults');
const _ = require('lodash');

const ajv = new Ajv({
  schemas: [
    configSchemas.sgsConfig,
  ],
}); // e
const sgsValidator = ajv.getSchema('http://example.com/schemas/sgsConfig.json');
const SemverizeParameters = require('./semverizeParameters');

module.exports = class SchemaGotSwagger {
  config: sgsConfig
  mainDataSp: SemverizeParameters<swaggerMainData>
  templatesSp: SemverizeParameters<mainTemplate>
  schemesSp: SemverizeParameters<schemePunkScheme>
  desiredRealizations: Array<string>
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
   * @param {(swaggerMakerOptions)} swaggerSrcOptions
   *   Optional swagger src options that will affect what and how swagger.json
   *   files are generated.
   * @param {(swaggerMakerOptions)} pathItemsSrcOptions
   *   Optional path item src options that will affect how swagger path items
   *   are created and processed.
   *
   * @returns {SchemaGotSwagger}
   *   Returns and instance of this.
   */
  init(
    swaggerSrc: semverishSrc,
    pathItemsSrc: semverish,
    config: userSgsConfig = {},
    swaggerSrcOptions?: mainSwaggerMakerOptions,
    pathItemsSrcOptions: pathSwaggerMakerOptions
  ): Promise<SchemaGotSwagger> {
    const getterDefaults: GetDefaults<sgsConfig> = new GetDefaults('Sgs'); // eslint-disable-line max-len

    return getterDefaults.getDefaults()
      .then((defaults) => {
        const merged: Promise<sgsConfig> = mergeDefaults(config, defaults);
        return merged;
      })
      .then((sgsMergedConfig) => {
        this.setConfig(sgsMergedConfig);
        // Create a swaggerSrc semverize parameters.
        const swaggerSrcSp: SemverizeParameters<swaggerMainData> = new SemverizeParameters(
          swaggerSrc,
          'swaggerMainSrcValidator',
          {
            dataDefaultsType: 'UserInput',
            semveristConfigDefaults: 'SgsSemverist',
          },
          {
            semveristConfig: _.get(swaggerSrcOptions, ['data', 'semveristConfig'], {}),
            semverishMolotov: _.get(
              swaggerSrcOptions,
              ['data', 'semveristMolotovOptions'],
              { overrides: {}, cocktailClasses: [] }
            ),
            desiredRealizations: this.getDesiredRealizations() ? this.getDesiredRealizations() : _.get(swaggerSrcOptions, ['data', 'desiredRealizations'], []), // eslint-disable-line max-len
            validate: true,
            swaggerVersion: this.getConfig().swaggerVersion,
            targetName: _.get(swaggerSrcOptions, ['data', 'targetName'], 'swaggerSrc'),
          }
        );
        return swaggerSrcSp.init();
      })
      .then(swaggerMain => this.setMainDataSpClass(swaggerMain)
        .setDesiredRealizations(this.getMainDataSpClass().getSemverRealizations()))
      .then(() => {
        const swaggerSrcTemplates = new SemverizeParameters(
          _.get(swaggerSrcOptions, ['templates', 'templatesOverrides'], {}),
          'templateValidator',
          {
            dataDefaultsType: 'SwaggerMainTemplates',
            semveristConfigDefaults: 'SwaggerSrcTemplates',
          },
          {
            semveristConfig: _.get(swaggerSrcOptions, ['templates', 'semveristConfig'], {}),
            semverishMolotov: _.get(
              swaggerSrcOptions,
              ['templates', 'semveristMolotovOptions'],
              { overrides: {}, cocktailClasses: [] }
            ),
            desiredRealizations: this.getDesiredRealizations(),
            validate: true,
            swaggerVersion: this.getConfig().swaggerVersion,
            targetName: _.get(swaggerSrcOptions, ['templates', 'targetName'], 'swagger'),
          }
        );
        const swaggerSrcSchemes = new SemverizeParameters(
          _.get(swaggerSrcOptions, ['schemes', 'schemes'], {}),
          'schemePunkValidator',
          {
            dataDefaultsType: 'SwaggerSrcScheme',
            semveristConfigDefaults: 'SwaggerSrcSchemeSemverist',
          },
          {
            semveristConfig: _.get(swaggerSrcOptions, ['schemes', 'semveristConfig'], {}),
            semverishMolotov: _.get(
              swaggerSrcOptions,
              ['schemes', 'semveristMolotovOptions'],
              { overrides: {}, cocktailClasses: [] }
            ),
            desiredRealizations: this.getDesiredRealizations(),
            validate: true,
            swaggerVersion: this.getConfig().swaggerVersion,
            targetName: _.get(swaggerSrcOptions, ['schemes', 'targetName'], 'swagger'),
          }
        );
        return Promise.all([
          swaggerSrcTemplates.init(),
          // Create a swagger src templates semverize parameters
          swaggerSrcSchemes.init(),
          // Create a swagger schemePunk schemes semverize parameters
        ]);
      })
      .then(([
        swaggerSrcTemplatesSp,
        swaggerSrcSchemesSp,
      ]) => this.setSwaggerSrcTemplatesSpClass(swaggerSrcTemplatesSp)
        .setSwaggerSrcSchemesSpClass(swaggerSrcSchemesSp))
      .then(() => this); // Need to blend in templates data to schemes as well as semver number for template use. Then Run schemes.
  }

  /**
   * Set config for this schema got swagger instance.
   *
   * @param {sgsConfig} config
   *   Swagger got style configuration.
   * @return {SchemaGotSwagger} the instance of this class.
   */
  setConfig(config: sgsConfig): SchemaGotSwagger {
    const validConfig: sgsConfig = sgsValidator(config);
    if (!validConfig) {
      throw new SchemaGotSwaggerError(`${SCHEMA_GOT_SWAGGER_CONFIG_VALIDATION_ERROR} ${validConfig.errors}`); // eslint-disable-line max-len
    }
    this.config = validConfig;
    return this;
  }

  /**
   * @returns {sgsConfig}
   *   Returns the Schema got swagger config for this instance.
   */
  getConfig(): sgsConfig {
    return this.config;
  }

  /**
   * Set Main Data Semverized Parameters Class.
   *
   * @param {SemverizeParameters} mainDataSp
   *   A semverized Parameter class.
   * @returns {SchemaGotSwagger}
   *   Returns an instance of this class.
   */
  setMainDataSpClass(mainDataSp: SemverizeParameters<swaggerMainData>): SchemaGotSwagger { // eslint-disable-line max-len
    this.mainDataSp = mainDataSp;
    return this;
  }

  /**
   * Gets the sp class for the main swagger data.
   *
   * @returns {SemverizeParameters}
   *   The semverize parameters class for the main swagger data.
   */
  getMainDataSpClass(): SemverizeParameters<swaggerMainData> {
    return this.mainDataSp;
  }

  /**
   * Sets the desired realizations for this Schema Got Swagger.
   * This can be set after create a new instance to set desired
   * realizations for the main swagger data. Otherwise this will
   * mirror the semver realizations in the main swagger file
   * after it has been run through the semverist.
   *
   * @param {Array<string>} realizations
   *   An array of semver strings correlating to the semantic
   *   versions for which you intend to create swagger documents.
   * @returns {SchemaGotSwagger}
   *   Returns an instance of this.
   */
  setDesiredRealizations(realizations: Array<string>): SchemaGotSwagger {
    this.desiredRealizations = realizations;
    return this;
  }

  /**
   * Gets the desired realizations array for this Sgs.
   *
   * @returns {array<string>}
   *   Returns an array of semver realizations.
   */
  getDesiredRealizations() {
    return this.desiredRealizations;
  }

  /**
   * Sets the main swagger src templates Semverized Parameters Class.
   *
   * @param {SemverizeParameters<mainTemplate>} templatesSp
   *   A semverized Parameter class.
   * @returns {SchemaGotSwagger}
   *   Returns an instance of this class.
   */
  setSwaggerSrcTemplatesSpClass(templatesSp: SemverizeParameters<mainTemplate>): SchemaGotSwagger {
    this.templatesSp = templatesSp;
    return this;
  }

  /**
   * Gets the templates Sp class.
   *
   * @returns {SemverizeParameters<mainTemplate>}
   * Returns a templates Sp class.
   */
  getSwaggerSrcTemplatesSpClass() {
    return this.templatesSp;
  }

  /**
   * Sets the main swagger src templates Semverized Parameters Class.
   *
   * @param {SemverizeParameters<schemePunkScheme>} schemesSp
   *   A semverized Parameter class.
   * @returns {SchemaGotSwagger}
   *   Returns an instance of this class.
   */
  setSwaggerSrcSchemesSpClass(schemesSp: SemverizeParameters<schemePunkScheme>): SchemaGotSwagger {
    this.schemesSp = schemesSp;
    return this;
  }

  /**
   * Gets the templates Sp class.
   *
   * @returns {SemverizeParameters<schemePunkScheme>}
   *  Returns an sp class for the scheme punk schemes.
   */
  getSwaggerSrcSchemesSpClass() {
    return this.templatesSp;
  }
};
