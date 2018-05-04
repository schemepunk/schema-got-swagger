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
    expect.assertions(7);
    const schemaGotSwagger = new SchemaGotSwagger();
    schemaGotSwagger.setDesiredRealizations(['1.0.0', '1.1.0', '1.1.0'])
    return schemaGotSwagger.init(swaggerSrc[1][0], paths, config, swaggerSrcOptions, pathsConfig)
    .then((sgs) => {
      expect(sgs).toBeInstanceOf(SchemaGotSwagger)
      expect(sgs.getSwaggerSrcSchemesSpClass()).toBeInstanceOf(SemverizeParameters);
      expect(sgs.getSwaggerSrcTemplatesSpClass()).toBeInstanceOf(SemverizeParameters);
      expect(sgs.getMainDataSpClass()).toBeInstanceOf(SemverizeParameters);
      expect(sgs.getMainDataSpClass().realized).toMatchSnapshot();
      expect(sgs.getPathsDataSpClass()).toBeInstanceOf(SemverizeParameters);
      expect(sgs.getSwagger()).toMatchSnapshot();
    });
  });
});

