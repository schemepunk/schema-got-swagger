//      

                                                               
                                                                                           
                                                               

const configSchemas = require('./../configSchemas');
const Ajv = require('ajv');
const _ = require('lodash');
const GetDefaults = require('./getDefaults');
const mergeDefaults = require('./mergeDefaults');
const semver = require('semver');
const semverist = require('semverist');

const {
  SCHEMA_GOT_SWAGGER_UNSUPPORTED_VALIDATION,
  SCHEMA_GOT_SWAGGER_VALIDATION_ERROR,
  SCHEMA_GOT_SWAGGER_REALIZED_SEMVER_ATTRIBUTES_DO_NOT_VALIDATE,
  SCHEMA_GOT_SWAGGER_SEMVER_REALIZATIONS_IS_NOT_AN_ARRAY,
} = require('./_errors');

const {
  SchemaGotSwaggerError,
  SchemaGotSwaggerReThrownError,
} = require('./SchemaGotSwaggerError');

const ajv = new Ajv({
  schemas: [
    configSchemas.schemePunkConfig,
    configSchemas.sgsConfig,
    configSchemas.semverish,
    configSchemas.swaggerMainData,
    configSchemas.swaggerMainTemplates,
    configSchemas.semveristConfig,
  ],
  allErrors: true,
  jsonPointers: true,
});

const validators = {
  sgsValidator: ajv.getSchema('http://example.com/schemas/sgsConfig.json'),
  swaggerMainSrcValidator: ajv.getSchema('http://example.com/schemas/swaggerMainData.json'),
  semveristConfigValidator: ajv.getSchema('http://example.com/schemas/semveristConfig.json'),
  templateValidator: ajv.getSchema('http://example.com/schemas/swaggerMainTemplate.json'),
  schemePunkValidator: ajv.getSchema('http://example.com/schemas/schemePunkConfig.json'),
  semverishValidator: ajv.getSchema('http://example.com/schemas/semverish.json'),
};


module.exports = class SemverizeParameters    {
                               
                                  
                                            
                                
                          
                   
                        
                                    
                                   
                    
                                                           
             
                     
                     
  /**
   * Creates an instance of SemverizeParameters.
   *
   * @param {(T | semverish | {})} data
   *   Data.
   * @param {string} validatorId
   *  A validator id.
   * @param {*} defaults
   *   Defaults
   * @param {{}} options
   *   Options.
   */
  constructor(
    data                      ,
    validatorId        , // eslint-disable-line
    defaults   
                               
                                      
      = {
      dataDefaultsType: '',
      semveristConfigDefaults: 'SgsSemverist',
    },
    options   
                                              
                                                                
                                         
                        
                             
                        
      = {
      semveristConfig: {},
      semverishMolotov: { overrides: {}, cocktailClasses: [] },
      desiredRealizations: [],
      validate: true,
      swaggerVersion: '3.0.0',
      targetName: 'swagger',
    },
  ) {
    // get semverist config defaults

    // validate semverist
    // merge passed and defaults
    this.semveristConfigtmp = options.semveristConfig;
    this.defaultSemveristConfig = defaults.semveristConfigDefaults;
    this.dataDefaultsType = defaults.dataDefaultsType;
    this.tmpData = data;
    this.desiredRealizations = options.desiredRealizations;
    this.targetName = options.targetName;
    this.semverishMolotov = options.semverishMolotov;
    this.validatorId = validatorId;
  }

  /**
   * Initializes the semverizeParameters class with
   *  all async class functions.
   *
   * @returns {Promise<SemverizeParameters>}
   *   Returns an instance of this.
   */
  init()                                    {
    // Set up semverist config for data.
    const getterDefaults                               = new GetDefaults(this.defaultSemveristConfig); // eslint-disable-line max-len

    return getterDefaults.getDefaults()
      .then((defaults) => {
        const merged                           = mergeDefaults(this.semveristConfigtmp, defaults);
        return merged;
      })
      .then((mergedConfig) => {
        this.setSemveristConfig(mergedConfig);
        return this.prepareSemverish(this.tmpData);
      }) // eslint-disable-line max-len
      .then((prepped) => {
        this.preppedData = _.cloneDeep(prepped);
        return this;
      })
      // Now run the semverist on the data with semverist config.
      .then(() => SemverizeParameters.createComposer(
        this.preppedData,
        { swaggerMain: this.getSemveristConfig() },
        'swaggerMain',
        this.semverishMolotov
      ))
      .then(composer => this.parseComposerAttributes(composer))
      .then(() => this.validateRealizedParameters());
  }

  /**
   * Set semverist config for this parameter.
   *
   * @param {semveristConfig} config
   *   Semverist config for this class.
   * @returns {SemverizeParameters}
   *   Returns an instance of this class.
   */
  setSemveristConfig(config                 )                         {
    this.validator('semveristConfigValidator', config);
    this.semveristConfig = config;
    return this;
  }

  /**
   * Returns semverist config for this class.
   *
   * @returns {semveristConfig}
   *   Returns a valid semverist config
   */
  getSemveristConfig()                  {
    return this.semveristConfig;
  }

  /**
   * Sets a number of composer related attributes in this class
   *   from the passed semverist composer class.
   *
   * @param {*} composer
   *   A composer class.
   * @returns {SemverizeParameters}
   *   Returns an instance of this.
   */
  parseComposerAttributes(composer   )                         {
    this.composer = composer;
    this.realized = composer.getComposition();
    this.setSemverRealizations(this.composer.getConverterClass().getSemverRealizations());
    return this;
  }

  /**
   * Sets the semver numbers where there are
   *   realizations of this data.
   *
   * @param {Array<string>} realizations
   *   An array of semver strings.
   * @returns {SemverizeParameters}
   *   Returns an instance of this class.
   */
  setSemverRealizations(realizations               )                         {
    if (!_.isArray(realizations)) throw new SchemaGotSwaggerError(SCHEMA_GOT_SWAGGER_SEMVER_REALIZATIONS_IS_NOT_AN_ARRAY); // eslint-disable-line max-len
    this.semverRealizations = realizations;
    return this;
  }

  /**
   * Gets an array of the semver locations
   *   of realizations of this data.
   *
   * @returns {Array<string>}
   *   Retuns an array of semver locations for data
   *   in the semverist composition related to this class.
   */
  getSemverRealizations()                {
    return this.semverRealizations;
  }

  /**
   * Validates realized parameters for all semver
   *   realizations of the composer class for this
   *   instance.
   *
   * @returns {SemverizeParameters}
   *   Returns an instance of this.
   */
  validateRealizedParameters()                         {
    this.getSemverRealizations().forEach((semverNum) => {
      try {
        const testCase = _.get(this.realized, _.concat(semverNum.split('.'), [this.targetName]));
        this.validator(this.validatorId, testCase);
      }
      catch (e) {
        throw new SchemaGotSwaggerReThrownError(
          SCHEMA_GOT_SWAGGER_REALIZED_SEMVER_ATTRIBUTES_DO_NOT_VALIDATE,
          `Attribute ${this.targetName} at ${semverNum}: ${e.message}`,
          e,
        );
      }
    });
    return this;
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
  semverizeToRealizations(targetValue   , targetName          = '')            {
    const realizations = this.desiredRealizations;
    let targetInjectedSemver = {};
    realizations.forEach((semverNum) => {
      const parsed = semver.parse(semverNum);
      const writeToAttributes = _.concat(
        [],
        parsed.major.toString(),
        parsed.minor.toString(),
        parsed.patch.toString(),
        parsed.prerelease.join('.'),
        `${targetName}`,
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
   * Semverize parameters turns the passed value into a semver shape
   *   with attributes at the passed semver realizations.
   * @param {{}} value
   *   The value of the parameter we wish to semverize.
   * @returns {Promise<semverish>}
   *   Returns a semverized version of the passed parameter type/value.
   */
  semverizeParameters(value   )                     {
    // Get the defaults for this type of data.
    const getterDefaults                 = new GetDefaults(this.dataDefaultsType);

    return getterDefaults.getDefaults()
      .then((defaults) => {
        // Merge the defaults with what was passed.
        const merged             = mergeDefaults(value, defaults);
        return merged;
      })
      // Now turn that to a semver shape.
      .then(mergedDefaults => this.semverizeToRealizations(mergedDefaults, this.targetName));
  }

  /**
   * Takes a passed in data value and semverizes it
   *   if needed.
   *
   * @param {((semverish | T))} value
   *   The passed in data value is either in semverish
   *   or is a single attribute that needs to be semverized.
   * @returns {Promise<semverish>}
   *   Returns a semverish shape.
   */
  prepareSemverish(value   )                     {
    try {
      this.validator('semverishValidator', value);
      return Promise.resolve(value);
    }
    catch (e) {
      // This did not validate. It is not semverish.
      return this.semverizeParameters(_.get(value, this.targetName, value));
    }
  }

  /**
   * Validate that the passed data conforms to the passed schema for the
   *   passed validation type.
   *
   * @param {string} validationType
   *   The validation type with which you wish to validate the data.
   * @param {W} data
   *   The data you wish to pass along to validate.
   * @returns {(W | boolean)}
   *   Returns an instance of Semverize parameters.
   */
  validator   (validationType        , data   )    {
    if (!_.has(validators, validationType)) {
      throw new SchemaGotSwaggerError(`${SCHEMA_GOT_SWAGGER_UNSUPPORTED_VALIDATION} Validation type: ${validationType}`); // eslint-disable-line max-len
    }
    const validator = _.get(validators, validationType);

    if (!validator(data)) {
      throw new SchemaGotSwaggerError(`${SCHEMA_GOT_SWAGGER_VALIDATION_ERROR} For:  ${validator.errors[0].message}`); // eslint-disable-line max-len
    }
    return validator;
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
    semverishSource              ,
    config                               ,
    nameSpace        ,
    semveristMolotovOptions                                         
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
