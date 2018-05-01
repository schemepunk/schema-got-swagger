'use strict';

const SchemaGotSwagger = require('./../../../lib/index');
const SemverizeParameters = require('./../../../lib/semverizeParameters');
const { SchemaGotSwaggerError } = require('./../../../lib/SchemaGotSwaggerError');
const swaggerMainHelper = require('./../../__helpers__/swaggerMainSemverish');

let tmpMocks = [];

const config = {
  swaggerVersion: '2.0.0',
  apiType: 'jsonApi',
  sgsType: 'semver',
  mergeConfig: {
    sgs: true
  },
  mainSwaggerSchemeProcessName: 'processTemplates'
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

const swaggerSrc = swaggerMainHelper;

describe('Index functional', () => {
  test('Index full with object output.', () => {
    expect.assertions(8);
    const schemaGotSwagger = new SchemaGotSwagger();
    return schemaGotSwagger.init(swaggerSrc, {}, config, swaggerSrcOptions)
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
    expect.assertions(6);
    const schemaGotSwagger = new SchemaGotSwagger();
    schemaGotSwagger.setDesiredRealizations(['1.0.0', '1.2.0'])
    return schemaGotSwagger.init(swaggerSrc[1][0], {}, config, swaggerSrcOptions)
    .then((sgs) => {
      expect(sgs).toBeInstanceOf(SchemaGotSwagger)
      expect(sgs.getSwaggerSrcSchemesSpClass()).toBeInstanceOf(SemverizeParameters);
      expect(sgs.getSwaggerSrcTemplatesSpClass()).toBeInstanceOf(SemverizeParameters);
      expect(sgs.getMainDataSpClass()).toBeInstanceOf(SemverizeParameters);
      expect(sgs.getMainDataSpClass().realized).toMatchSnapshot();
      expect(sgs.getSwagger()).toMatchSnapshot();
    });
  });
});

