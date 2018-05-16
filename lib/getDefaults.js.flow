// @flow

const DEFAULT_TYPES = {
  sgs: `/../defaults/sgsConfig.yaml`,
  sgsSemverist: `/../defaults/swaggerSrcSemverist.yaml`,
  swaggerSrcschemes: `/../defaults/swaggerSrcScheme.yaml`,
  swaggerSrcdataSemverist: `/../defaults/swaggerSrcSemverist.yaml`,
  pathsdataSemverist: `/../defaults/pathsDataSemverist.yaml`,
  swaggerSrcschemesSemverist: `/../defaults/swaggerSrcSchemesSemverist.yaml`,
  swaggerSrctemplatesSemverist: `/../defaults/swaggerSrcTemplatesSemverist.yaml`,
  swaggerSrctemplates: '',
  pathstemplates: '',
  pathstemplatesSemverist: `/../defaults/swaggerSrcTemplatesSemverist.yaml`,
  pathsschemes: `/../defaults/pathsScheme.yaml`,
  pathsschemesSemverist: `/../defaults/swaggerSrcSemverist.yaml`,
  swaggerSrcdata: '',
  pathsdata: '',
  custom: '',
};

const FUNCTION_DEFAULT_TYPES = [
  'swaggerSrctemplates',
  'pathstemplates',
  'swaggerSrcdata',
  'pathsdata',
  'custom',
];

// gets default configurations for all schemaGotSwagger options and config.
// require defaults
const fs = require('fs');
const _ = require('lodash');
const yaml = require('js-yaml');
const { SchemaGotSwaggerError, SchemaGotSwaggerReThrownError } = require('./SchemaGotSwaggerError');
const {
  YAML_FILE_LOAD_PROBLEM,
  DEFAULT_DID_NOT_EXIST,
} = require('./_errors');
const swaggerSrctemplates = require('./../templates/swaggerSrc');
const pathstemplates = require('./../templates/swaggerPaths');
// load up yaml.

/**
 * The Configurator class.
 *
 * @class Configurator
 */
class GetDefaults<T> {
  defaultType: string
  swaggerVersion: string
  /**
   * Creates an instance of GetDefaults.
   * @param {configTypes} defaultType
   *   The default you would like to retrieve.
   * @param {string} [swaggerVersion='3.0.0']
   *   The swagger version can have an affect on the default for some defaults.
   *   It defaults to 3.0.0
   * @memberof GetDefaults
   */
  constructor(defaultType: string, swaggerVersion?: string = '2.0.0'): void {
    if (!_.has(DEFAULT_TYPES, defaultType)) {
      throw new SchemaGotSwaggerError(`${DEFAULT_DID_NOT_EXIST}: ${defaultType}`);
    }
    this.defaultType = defaultType;
    this.swaggerVersion = swaggerVersion;
  }

  /**
   * Gets the indicated default.
   *
   * @returns {Promise<T>}
   *   Returns the specified default.
   * @memberof GetDefaults
   */
  getDefaults(): Promise<T> {
    if (_.indexOf(FUNCTION_DEFAULT_TYPES, this.defaultType) !== -1) {
      // This is not a yaml type so load via function.
      // $FlowFixMe
      return this[`get${this.defaultType}Defaults`]();
    }

    return this.loadYamlDefaults(_.get(DEFAULT_TYPES, this.defaultType));
  }
  /**
   * Get Sgs default configs.
   *
   * @param {string} yamlPath
   *   A yaml path that corresponds with the default type.
   * @returns {Promise<sgsConfig>}
   *   Returns Schema got swagger configurations.
   */
  loadYamlDefaults(yamlPath): Promise<T> {
    return this.promiseYamlRetrieval(`${__dirname}${yamlPath}`)
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
  getswaggerSrctemplatesDefaults(): Promise<T> {
    return this.getSwaggerTemplateYaml(swaggerSrctemplates);
  }

  /**
   * Gets the main swaggerSrc template defaults.  This is not a yaml
   *   file but a js file and the pathing is a little different.
   *
   * @returns {Promise<mainTemplate>}
   *   A swagger template appropriate to the version of swagger
   *   you are targeting.
   * @memberof Configurator
   */
  getpathstemplatesDefaults(): Promise<T> {
    return this.getSwaggerTemplateYaml(pathstemplates);
  }

  /**
   * Gets swagger template yaml.
   *
   * @param {Object} defaults
   *   An object containing templates for different versions of swagger.
   * @returns {Promise<T>}
   *   Returns a templateData bearing promise.
   * @memberof GetDefaults
   */
  getSwaggerTemplateYaml(defaults: Object): Promise<T> {
    return Promise.resolve(_.get(
      defaults,
      `swagger_${this.swaggerVersion.split('.').join('_')}`,
      defaults.swagger_2_0_0
    ))
      .then(data => data);
  }

  /**
   * Unifies setting of defaults for
   *   user provided data. Since there
   *   can be no defaults for this data
   *   that would be relevant.
   *
   * @returns {Promise<{}>}
   *   Returns a promise bearing and empty object.
   * @memberof GetDefaults
   */
  getswaggerSrcdataDefaults(): Promise<{}> {
    return Promise.resolve({})
      .then(data => data);
  }

  /**
   * Unifies setting of defaults for
   *   user provided data. Since there
   *   can be no defaults for this data
   *   that would be relevant.
   *
   * @returns {Promise<{}>}
   *   Returns a promise bearing and empty object.
   * @memberof GetDefaults
   */
  getpathsdataDefaults(): Promise<{}> {
    return Promise.resolve({})
      .then(data => data);
  }

  /**
   * Unifies setting of defaults for
   *   user provided data. Since there
   *   can be no defaults for this data
   *   that would be relevant.
   *
   * @returns {Promise<{}>}
   *   Returns a promise bearing and empty object.
   * @memberof GetDefaults
   */
  getcustomDefaults(): Promise<{}> {
    return Promise.resolve({})
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
  promiseYamlRetrieval(fileName: string): Promise<T> {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, (err, data) => {
        if (err) {
          return reject(new SchemaGotSwaggerReThrownError(
            `${YAML_FILE_LOAD_PROBLEM}: type ${this.defaultType}`,
            err.message,
            err
          ));
        }
        return resolve(yaml.safeLoad(data));
      });
    });
  }
}

module.exports = GetDefaults;
