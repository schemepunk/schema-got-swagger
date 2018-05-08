'use strict';

const SchemaGotSwagger = require('./../../../lib/index');
const SemverizeParameters = require('./../../../lib/semverizeParameters');
const { SchemaGotSwaggerError } = require('./../../../lib/SchemaGotSwaggerError');
const swaggerMainHelper = require('./../../__helpers__/swaggerMainSemverish');
const paths = require('./../../__helpers__/semverishPathItems');

let tmpMocks = [];

const config = {
  swaggerVersion: '2.0.0',
  apiType: 'jsonApi',
  sgsType: 'semver',
  mergeConfig: {
    sgs: true
  },
  mainSwaggerSchemeProcessName: 'processTemplates',
  realizationSource: 'swaggerSrc'
};

const swaggerSrcOptions = {
  data: {
    semveristConfig: {},
    targetName: 'swaggerSrc',
  },
  schemes: {
    schemes: {},
    semveristConfig: {},
    targetName: 'swaggerSrc'
  },
  templates: {
    semveristConfig: {},
    templates: {},
    targetName: 'swaggerSrc'
  }
};

const pathsConfig = {
  data: {
    semveristConfig: {},
    targetName: 'definitions',
  },
  schemes: {
    schemes: {},
    semveristConfig: {},
    targetName: 'paths'
  },
  templates: {
    semveristConfig: {},
    templates: {},
    targetName: 'paths'
  }
};

const data = {
  1: {
    0: {
      0: {
        example: {
          schemes: {
            processTemplates: [
              [
                {
                  source: {
                    target: 'swaggerSrc',
                    plugin: 'originalSchemeSource',
                  },
                  transform: {
                    plugin: 'tokenTemplateValues'
                  },
                  destination: {
                    target: 'swaggerSrc'
                  }
                }
              ]
            ]
          }
        },
        test: {
          schemes: {
            processTemplates: [
              [
                {
                  source: {
                    target: 'swaggerSrc',
                    plugin: 'originalSchemeSource',
                  },
                  transform: {
                    plugin: 'tokenTemplateValues'
                  },
                  destination: {
                    target: 'swaggerSrc'
                  }
                }
              ]
            ]
          }
        }
      }
    }
  }
};
const schemesConfig = {
  semveristConfig: {},
  semverishMolotov: { overrides: {}, cocktailClasses: []},
  desiredRealizations: ['1.0.0'],
  validate: true,
  swaggerVersion: '2.0.0',
  targetName: 'schemes'
}

const swaggerSrc = swaggerMainHelper;

describe('Index functional', () => {
  test('Index full with object output.', () => {
    expect.assertions(8);
    const schemaGotSwagger = new SchemaGotSwagger();
    return schemaGotSwagger.init(swaggerSrc, paths, config, swaggerSrcOptions, pathsConfig)
    .then((sgs) => {
      expect(sgs).toBeInstanceOf(SchemaGotSwagger)
      expect(sgs.getSwaggerSrcSchemesSpClass()).toBeInstanceOf(SemverizeParameters);
      expect(sgs.getSwaggerSrcTemplatesSpClass()).toBeInstanceOf(SemverizeParameters);
      expect(sgs.getMainDataSpClass()).toBeInstanceOf(SemverizeParameters);
      expect(sgs.getMainDataSpClass().realized).toMatchSnapshot();
      expect(sgs.getSwaggerSrcTemplatesSpClass().realized).toMatchSnapshot();
      expect(sgs.getSwaggerSrcSchemesSpClass().realized).toMatchSnapshot();
      expect(sgs.getSwagger()).toMatchSnapshot();
    });
  });
});

describe('Index functional simple swagger Src', () => {
  test('Simple swagger src..', () => {
    expect.assertions(8);
    const schemaGotSwagger = new SchemaGotSwagger();
    schemaGotSwagger.setDesiredRealizations(['1.0.0', '1.1.0', '1.1.1'])
    return schemaGotSwagger.init(swaggerSrc[1][0], paths, config, swaggerSrcOptions, pathsConfig)
    .then((sgs) => {
      expect(sgs).toBeInstanceOf(SchemaGotSwagger)
      expect(sgs.getSwaggerSrcSchemesSpClass()).toBeInstanceOf(SemverizeParameters);
      expect(sgs.getSwaggerSrcTemplatesSpClass()).toBeInstanceOf(SemverizeParameters);
      expect(sgs.getMainDataSpClass()).toBeInstanceOf(SemverizeParameters);
      expect(sgs.getMainDataSpClass().realized).toMatchSnapshot();
      expect(sgs.getPathsDataSpClass()).toBeInstanceOf(SemverizeParameters);
      expect(sgs.getPathsTemplatesSpClass()).toBeInstanceOf(SemverizeParameters);
      expect(sgs.getSwagger()).toMatchSnapshot();
    });
  });
});

describe('Paths entity sp Guarantee', ()  => {
  test('Sp Guarantee same entities', () => {
    expect.assertions(1);
    // Create a Semverize parameters

    const spClass = new SemverizeParameters(data, 'pathsschemesValidator', { dataDefaultsType: 'pathsschemes', semveristConfigDefaults: 'pathsschemesSemverist' }, schemesConfig);
    const testData = { example: {}, test: {}};
    const schemaGotSwagger = new SchemaGotSwagger();
    return spClass.init()
    .then((sp) => expect(schemaGotSwagger.pathsEntitySpGuarantee(['1', '0', '0'], testData, sp)).toMatchSnapshot());
  });
});

describe('Paths entity sp Guarantee no entities', ()  => {
  test('Sp Guarantee no entities', () => {
    expect.assertions(1);
    // Create a Semverize parameters

    const spClass = new SemverizeParameters(data[1][0][0].example.schemes, 'pathsschemesValidator', { dataDefaultsType: 'pathsschemes', semveristConfigDefaults: 'pathsschemesSemverist' }, schemesConfig);
    const testData = { example: {}, test: {}};
    const schemaGotSwagger = new SchemaGotSwagger();
    return spClass.init()
    .then((sp) => expect(schemaGotSwagger.pathsEntitySpGuarantee(['1', '0', '0'], testData, sp)).toMatchSnapshot());
  });
});

describe('Entity mismatch', ()  => {
  test('Sp Guarantee not all entities', () => {
    expect.assertions(1);
    // Create a Semverize parameters

    const spClass = new SemverizeParameters(data, 'pathsschemesValidator', { dataDefaultsType: 'pathsschemes', semveristConfigDefaults: 'pathsschemesSemverist' }, schemesConfig);
    const testData = { example: {}, test: {}, snarf: {}};
    const schemaGotSwagger = new SchemaGotSwagger();
    return spClass.init()
    .then((sp) => schemaGotSwagger.pathsEntitySpGuarantee(['1', '0', '0'], testData, sp))
    .catch((e) => expect(e).toBeInstanceOf(SchemaGotSwaggerError));
  });
});