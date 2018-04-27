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
const SchemeRunner = require('@schemepunk/scheme-punk/lib/SchemeRunner');
const {
  SCHEMA_GOT_SWAGGER_CONFIG_VALIDATION_ERROR,
} = require('./_errors');
const {
  SchemaGotSwaggerError,
  SchemaGotSwaggerReThrownError,
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
  realizedMainSwagger: semverish
  swaggerComposer: *
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
            targetName: _.get(swaggerSrcOptions, ['templates', 'targetName'], 'swaggerSrc'),
          }
        );
        const swaggerSrcSchemes = new SemverizeParameters(
          _.get(swaggerSrcOptions, ['schemes', 'schemes'], {}),
          'schemePunkValidator',
          {
            dataDefaultsType: 'SwaggerSrcScheme',
            semveristConfigDefaults: 'SwaggerSrcSchemesSemverist',
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
            targetName: _.get(swaggerSrcOptions, ['schemes', 'targetName'], 'default'),
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
      .then(() => this.integrateTemplatesAndSchemes())
      .then(() => this.schemeRunner(this.getMainDataSpClass(), this.getSwaggerSrcSchemesSpClass()))
      .then((realizedMainSemverish) => {
        this.realizedMainSwagger = realizedMainSemverish;
        // Run realizedMainSwagger through semverist.
        this.mainDataSp.getSemverRealizations().forEach((semver) => {
          _.set(
            this.realizedMainSwagger,
            _.concat(this.semverStringSplit(semver), ['swagger']),
            JSON.parse(_.get(this.realizedMainSwagger, _.concat(this.semverStringSplit(semver), ['swagger'])))
          );
        });
        return SemverizeParameters.createComposer(
          this.realizedMainSwagger,
          { swaggerMain: this.getConfig().sgsSemver },
          'swaggerMain',
          { overrides: {}, cocktailClasses: [] }
        );
      })
      .then((comp) => {
        this.swaggerComposer = comp;
        return this;
      });
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
      throw new SchemaGotSwaggerError(`${SCHEMA_GOT_SWAGGER_CONFIG_VALIDATION_ERROR} ${sgsValidator.errors[0].message}`); // eslint-disable-line max-len
    }
    this.config = config;
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
   * Write the final swagger to object or directory.
   *
   * @returns {void};
   */
  writeSwagger(): void {
    this.swaggerComposer.writeComposition();
  }

  /**
   * Gets the final swagger.
   *
   * @returns {semverish}
   *   A final swagger document.
   */
  getSwagger() {
    return this.swaggerComposer.getComposition();
  }

  /**
   * Integrate templates and schemas.
   *
   * @returns {SchemaGotSwagger}
   *   returns an instance of this.
   *
   */
  integrateTemplatesAndSchemes(): SchemaGotSwagger {
    const schemes = this.getSwaggerSrcSchemesSpClass().realized;
    const schemesTarget = this.getSwaggerSrcSchemesSpClass().targetName;
    const templatesTarget = this.getSwaggerSrcTemplatesSpClass().targetName;
    const templates = this.getSwaggerSrcTemplatesSpClass().realized;
    // For each semverRealizations
    this.getMainDataSpClass().getSemverRealizations().forEach((semverNum) => {
      const tempSchemeArray = _.get(
        schemes,
        _.concat(
          semverNum.split('.'),
          [schemesTarget],
          [this.getConfig().mainSwaggerSchemeProcessName]
        )
      );
      tempSchemeArray.forEach((innerArray, index) => {
        if (innerArray[0].transform.plugin === 'tokenTemplateValues') {
          const tmpArray = innerArray[0];
          // Set api version for templates use as a holdOver.
          const holdOvers = _.get(tmpArray, 'holdOvers', {});
          tmpArray.holdOvers = _.merge(holdOvers, { apiSemver: semverNum });
          // Now set templates.
          tmpArray.templateObject = _.get(
            templates,
            _.concat(semverNum.split('.'), [templatesTarget])
          );
          tempSchemeArray[index][0] = tmpArray;
        }
      });
      _.set(
        schemes,
        _.concat(
          semverNum.split('.'),
          [schemesTarget],
          [this.getConfig().mainSwaggerSchemeProcessName]
        ),
        tempSchemeArray
      );
    });
    this.getSwaggerSrcSchemesSpClass().realized = schemes;
    this.getSwaggerSrcSchemesSpClass().composer.setComposition(schemes);
    // insert a holdover for the api value in the scheme.
    // insert the templates into the scheme.
    return this;
  }

  /**
   * Set Main Data Semverized Parameters Class.
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
    return this.schemesSp;
  }

  /**
   * A schemeRunner, a way to apply schemes to data shapes.
   *
   * @param {SemverizeParameters} dataSp
   *   A SemverizeParameters class for the data.
   * @param {SemverizeParameters} schemesSp
   *   A SemverizeParameters class for the schemes.
   * @returns {Promise<SemverizeParameters<swaggerMainData>>}
   *  Returns an instance of this.
   */
  schemeRunner(
    dataSp: SemverizeParameters<swaggerMainData>,
    schemesSp: SemverizeParameters<schemePunkScheme>
  ): Promise<semverish> {
    const schemeTransformedData = {};
    const items = [];
    dataSp.getSemverRealizations().forEach((semverNum) => {
      if (_.has(
        schemesSp.realized,
        _.concat(this.semverStringSplit(semverNum), [schemesSp.targetName])
      )) {
        // We have a matching scheme. So we can move forward with
        // schemePunk processing.
        const schemeConfig = _.get(
          schemesSp.realized,
          _.concat(this.semverStringSplit(semverNum), [schemesSp.targetName])
        );

        const obj = _.get(
          dataSp.realized,
          _.concat(this.semverStringSplit(semverNum))
        );

        const schemeRunner = new SchemeRunner();

        items.push(schemeRunner.init(_.cloneDeep(obj), _.cloneDeep(schemeConfig), { overrides: {}, cocktailClasses: [] })
          .then(sr => sr.runScheme())
          .then(data => _.setWith(
            schemeTransformedData,
            _.concat(
              this.semverStringSplit(semverNum),
              ['swagger']
            ),
            data[dataSp.targetName],
            Object
          )));
      }
    });
    return Promise.all(items)
      .then(() => schemeTransformedData);
  }

  /**
   * Split a semver string into an array.
   *
   * @param {string} semverString
   *   A semver string.
   * @returns {Array<string>}
   *   An array of semver strings.
   */
  semverStringSplit(semverString: string) {
    return semverString.split('.');
  }
};
