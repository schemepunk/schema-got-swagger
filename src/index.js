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
  pathTemplate,
  sgsDataType,
  configNameSpace,
  pathsData,
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
  pathsDataSp: SemverizeParameters<pathsData>
  pathTemplatesSp: SemverizeParameters<pathTemplate>
  pathsSchemesSp: SemverizeParameters<schemePunkScheme>
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
    const getterDefaults: GetDefaults<sgsConfig> = new GetDefaults('sgs'); // eslint-disable-line max-len
    const realizationOrder: Array<('swaggerSrc' | 'paths')> = [];

    return getterDefaults.getDefaults()
      .then((defaults) => {
        const merged: Promise<sgsConfig> = mergeDefaults(config, defaults);
        return merged;
      })
      .then((sgsMergedConfig) => {
        this.setConfig(sgsMergedConfig);
        // Check to see who will be responsible for our semver Realizations

        const realizationSource = _.get(this.getConfig(), ['realizationSource'], 'swaggerSrc');
        let optionsForDesiredRealizations;
        if (realizationSource === 'paths') {
          realizationOrder.push('paths');
          realizationOrder.push('swaggerSrc');
          optionsForDesiredRealizations = pathItemsSrcOptions;
        }
        else {
          realizationOrder.push('swaggerSrc');
          realizationOrder.push('paths');
          optionsForDesiredRealizations = swaggerSrcOptions;
        }

        // Create a swaggerSrc semverize parameters.
        const tmpDesired = this.getDesiredRealizations() ? this.getDesiredRealizations() : _.get(
          optionsForDesiredRealizations,
          ['data', 'desiredRealizations'],
          []
        );
        this.setDesiredRealizations(tmpDesired);
        const dataSps: {swaggerSrc: SemverizeParameters<swaggerMainData>, paths: SemverizeParameters<pathsData> } = { // eslint-disable-line max-len
          swaggerSrc: this.spMaker(swaggerSrc, 'data', 'swaggerSrc', swaggerSrcOptions),
          paths: this.spMaker(pathItemsSrc, 'data', 'paths', pathItemsSrcOptions),
        };
        // $FlowFixMe
        const dataSpPromises = [dataSps[realizationOrder[0]].init(), Promise.resolve(dataSps[realizationOrder[1]])]; // eslint-disable-line max-len
        // This priority determines who sets the realizations for this Sgs.
        // It can be either the swaggerSrc (by default) OR the paths data.
        return Promise.all(dataSpPromises);
      })
      .then((dataSps) => {
        // the item in the 0 position has been inited and realized. So we can
        // activate this for everything else.
        this.setDesiredRealizations(dataSps[0].getSemverRealizations());
        return Promise.all([dataSps[0], dataSps[1].init()]);
      })
      .then((dataSpsInitialized) => {
        this.setMainDataSpClass(dataSpsInitialized[realizationOrder.indexOf('swaggerSrc')]);
        // $FlowFixMe
        this.setPathsDataSpClass(dataSpsInitialized[realizationOrder.indexOf('paths')]);

        const templatesData = _.get(swaggerSrcOptions, ['templates', 'templates'], {});
        const swaggerSrcTemplates: SemverizeParameters<mainTemplate> = this.spMaker(templatesData, 'templates', 'swaggerSrc', swaggerSrcOptions); // eslint-disable-line max-len
        const templatesPaths = _.get(pathItemsSrcOptions, ['templates', 'templates'], {});
        const pathsTemplates: SemverizeParameters<pathTemplate> = this.spMaker(templatesPaths, 'templates', 'paths', pathItemsSrcOptions); // eslint-disable-line max-len
        const schemesData = _.get(swaggerSrcOptions, ['schemes', 'schemes'], {});
        const swaggerSrcSchemes: SemverizeParameters<schemePunkScheme> = this.spMaker(schemesData, 'schemes', 'swaggerSrc', swaggerSrcOptions); // eslint-disable-line max-len
        const schemesPaths = _.get(pathItemsSrcOptions, ['schemes', 'schemes'], {});
        const pathsSchemes: SemverizeParameters<schemePunkScheme> = this.spMaker(schemesPaths, 'schemes', 'paths', pathItemsSrcOptions); // eslint-disable-line max-len
        return Promise.all([
          swaggerSrcTemplates.init(),
          // Create a swagger src templates semverize parameters
          swaggerSrcSchemes.init(),
          // Create a swagger schemePunk schemes semverize parameters
          pathsTemplates.init(),
          pathsSchemes.init(),
        ]);
      })
      .then(([
        swaggerSrcTemplatesSp,
        swaggerSrcSchemesSp,
        pathsTemplatesSp,
        pathsSchemesSp,
      ]) => this.setSwaggerSrcTemplatesSpClass(swaggerSrcTemplatesSp)
        .setSwaggerSrcSchemesSpClass(swaggerSrcSchemesSp)
        .setPathsTemplatesSpClass(pathsTemplatesSp)
        .setPathsSchemesSpClass(pathsSchemesSp))
      .then(() => this.integrateSwaggerSrcTemplatesAndSchemes())
      .then(() => this.schemeRunner(this.getMainDataSpClass(), this.getSwaggerSrcSchemesSpClass()))
      .then((realizedMainSemverish) => {
        this.realizedMainSwagger = realizedMainSemverish;
        // Run realizedMainSwagger through semverist.
        this.mainDataSp.getSemverRealizations().forEach((semver) => {
          _.set(
            this.realizedMainSwagger,
            _.concat(this.semverStringSplit(semver), ['swagger']),
            JSON.parse(_.get(
              this.realizedMainSwagger,
              _.concat(this.semverStringSplit(semver), ['swagger'])
            ))
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
  integrateSwaggerSrcTemplatesAndSchemes(): SchemaGotSwagger {
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
    const tempSpClass = this.getSwaggerSrcSchemesSpClass();
    tempSpClass.realized = schemes;
    tempSpClass.composer.setComposition(schemes);
    this.setSwaggerSrcSchemesSpClass(tempSpClass);
    // insert a holdover for the api value in the scheme.
    // insert the templates into the scheme.
    return this;
  }

  /**
   * Integrate templates and schemas.
   *
   * @returns {SchemaGotSwagger}
   *   returns an instance of this.
   *
   */
  integratePathsTemplatesAndSchemes(): SchemaGotSwagger {
    // For each semverRealization get the attributes at that level in pathData
    const semverRealizations = this.getPathsDataSpClass().getSemverRealizations();
    const schemes = {};
    semverRealizations.forEach((semver) => {
      const currentSemverArray = this.semverStringSplit(semver);
      // Set SchemesSP with new composition.
      const schemesAttributesAtLevel = this.pathsEntitySpGuarantee(
        currentSemverArray,
        _.get(this.getPathsDataSpClass().realized, currentSemverArray),
        this.getPathsSchemesSpClass()
      );

      const templatesAttributesAtLevel = this.pathsEntitySpGuarantee(
        currentSemverArray,
        _.get(this.getPathsDataSpClass().realized, currentSemverArray), // $FlowFixMe
        this.getPathsTemplatesSpClass()
      );

      // Take the templates and add them to the schemes.
      _.forEach(schemesAttributesAtLevel, (value, key) => {
        const tempSchemeArray = _.get(
          value,
          _.concat(
            [this.getPathsSchemesSpClass().targetName],
            [this.getConfig().pathsSchemeProcessName],
          )
        );

        tempSchemeArray.forEach((innerArray, index) => {
          if (innerArray[0].transform.plugin === 'tokenTemplateValues') {
            const tmpArray = innerArray[0];
            // Set api version for templates use as a holdOver.
            const holdOvers = _.get(tmpArray, 'holdOvers', {});
            tmpArray.holdOvers = _.merge(holdOvers, { apiSemver: semver, entityName: key });
            // Now set templates.
            tmpArray.templateObject = _.get(
              templatesAttributesAtLevel,
              _.concat([key], [this.getPathsTemplatesSpClass().targetName])
            );
            tempSchemeArray[index][0] = tmpArray;
          }
        });
        _.set(
          schemesAttributesAtLevel,
          _.concat(
            key,
            [this.getPathsSchemesSpClass().targetName],
            [this.getConfig().pathsSchemeProcessName]
          ),
          tempSchemeArray
        );
      });
      _.setWith(schemes, currentSemverArray, schemesAttributesAtLevel, Object);
    });
    const tempSpClass = this.getPathsSchemesSpClass();
    tempSpClass.realized = schemes;
    tempSpClass.composer.setComposition(schemes);
    this.setPathsSchemesSpClass(tempSpClass);
    // then we merge the templates into the schemes and reset schemes.
    return this;
  }

  /**
   * Guarantees that the attribute or entity paths in passed sp class
   *   match the passed data attributes at a given semver level.
   *
   * @param {Array<string>} currentSemverArray
   *   A semver number broken into a path string.
   * @param {{}} dataAttributesAtLevel
   *   An object with data attributes.
   * @param {any} spClassToGuarantee
   *   The Sp Class we want to guarantee.
   * @returns {Object}
   *   The guaranteed attributes at this level for the passed spClass.
   */
  pathsEntitySpGuarantee(currentSemverArray: Array<string>, dataAttributesAtLevel: {}, spClassToGuarantee: SemverizeParameters<*>) { // eslint-disable-line max-len
    const pathsAttributesArray: Array<string> = Object.keys(dataAttributesAtLevel);
    // Check for matches in sp class.. If all attributes are there the user has
    let spAttributesAtLevel: {} = _.get(spClassToGuarantee.realized, currentSemverArray);
    const spAttributeNamesArray: Array<string> = Object.keys(spAttributesAtLevel);
    // See if sp has all the entity keys it is supposed to and if
    // not make it so or throw.
    const spArrayDiff = _.difference(pathsAttributesArray, spAttributeNamesArray);
    if (spArrayDiff.length) {
      if (
        spAttributeNamesArray.length > 1 ||
        !_.has(spAttributesAtLevel, spClassToGuarantee.targetName)
      ) {
        // Either we have multiple schemes at level but not all the correct
        // ones or we do not have our default scheme.
        throw new SchemaGotSwaggerError(`The Path ${spClassToGuarantee.dataDefaultsType} that was passed should either be a single scheme item at the path schemes target name: ${spClassToGuarantee.targetName} or a semverish object that corresponds to the paths data object.`); // eslint-disable-line max-len
      }
      // Otherwise we want to create all of the same attributes at this level
      // in the schemes realization and add the target name scheme.
      const newSchemes = {};
      pathsAttributesArray.forEach((path) => {
        _.setWith(
          newSchemes,
          _.concat(
            currentSemverArray,
            [path]
          ),
          _.get(
            spAttributesAtLevel,
            spClassToGuarantee.targetName
          ),
          Object
        );
      });
      spAttributesAtLevel = newSchemes;
    }
    // Set SchemesSP with new composition.
    return spAttributesAtLevel;
  }

  /**
   * Set Main Data Semverized Parameters Class.
   * @param {SemverizeParameters<swaggerMainData>} mainDataSp
   *   A semverized Parameter class.
   * @returns {SchemaGotSwagger}
   *  An instance of this.
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
   * Set Path Data Semverized Parameters Class.
   * @param {SemverizeParameters} pathsDataSp
   *   A semverized Parameter class.
   * @returns {SchemaGotSwagger}
   *   Returns an instance of this class.
   */
  setPathsDataSpClass(pathsDataSp: SemverizeParameters<pathsData>): SchemaGotSwagger { // eslint-disable-line max-len
    this.pathsDataSp = pathsDataSp;
    return this;
  }

  /**
   * Gets the sp class for the paths swagger data.
   *
   * @returns {SemverizeParameters}
   *   The semverize parameters class for the paths swagger data.
   */
  getPathsDataSpClass(): SemverizeParameters<pathsData> {
    return this.pathsDataSp;
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
   * Sets the paths templates Semverized Parameters Class.
   *
   * @param {SemverizeParameters<pathTemplate>} templatesSp
   *   A semverized Parameter class.
   * @returns {SchemaGotSwagger}
   *   Returns an instance of this class.
   */
  setPathsTemplatesSpClass(templatesSp: SemverizeParameters<pathTemplate>): SchemaGotSwagger {
    this.pathTemplatesSp = templatesSp;
    return this;
  }

  /**
   * Gets the templates Sp class.
   *
   * @returns {SemverizeParameters<pathTemplate>}
   * Returns a templates Sp class.
   */
  getPathsTemplatesSpClass() {
    return this.pathTemplatesSp;
  }

  /**
   * Sets the main swagger src Schemes' Semverized Parameters Class.
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
   * Gets the swaggerSrc schemes Sp class.
   *
   * @returns {SemverizeParameters<schemePunkScheme>}
   *  Returns an sp class for the scheme punk schemes.
   */
  getSwaggerSrcSchemesSpClass() {
    return this.schemesSp;
  }

  /**
   * Sets the paths Schemes Semverized Parameters Class.
   *
   * @param {SemverizeParameters<schemePunkScheme>} schemesSp
   *   A semverized Parameter class.
   * @returns {SchemaGotSwagger}
   *   Returns an instance of this class.
   */
  setPathsSchemesSpClass(schemesSp: SemverizeParameters<schemePunkScheme>): SchemaGotSwagger {
    this.pathsSchemesSp = schemesSp;
    return this;
  }

  /**
   * Gets the paths schemes Sp class.
   *
   * @returns {SemverizeParameters<schemePunkScheme>}
   *  Returns an sp class for the scheme punk schemes.
   */
  getPathsSchemesSpClass() {
    return this.pathsSchemesSp;
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

        items.push(schemeRunner.init(
          _.cloneDeep(obj),
          _.cloneDeep(schemeConfig),
          {
            overrides: {},
            cocktailClasses: [],
          }
        )
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

  /**
   * Sp maker instantiates a semverize Parameter class.
   * @param {*} data
   *   A data source to use with the spMaker.
   * @param {configNameSpace} configNameSpaceType
   *   A config name space, data, templates, or schemes.
   * @param {sgsDataType} sgsDataTypeName
   *   A sgs data type name swaggerSrc or paths.
   * @param {*} options
   *   An options object.
   * @returns {SemverizeParameters}
   *  A sp.
   */
  spMaker(
    data: *,
    configNameSpaceType: configNameSpace,
    sgsDataTypeName: sgsDataType,
    options: *
  ) {
    const dataName = `${sgsDataTypeName}${configNameSpaceType}`;
    const sp = new SemverizeParameters(
      data,
      `${dataName}Validator`,
      {
        dataDefaultsType: dataName,
        semveristConfigDefaults: `${dataName}Semverist`,
      },
      {
        semveristConfig: _.get(options, [configNameSpaceType, 'semveristConfig'], {}),
        semverishMolotov: _.get(
          options,
          [configNameSpaceType, 'semveristMolotovOptions'],
          { overrides: {}, cocktailClasses: [] }
        ),
        desiredRealizations: this.getDesiredRealizations(),
        validate: true,
        swaggerVersion: this.getConfig().swaggerVersion,
        targetName: _.get(options, [configNameSpaceType, 'targetName'], sgsDataTypeName),
      }
    );
    return sp;
  }
};
