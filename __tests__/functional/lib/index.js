'use strict';

const SchemaGotSwagger = require('../../../lib/index');
const SemverizeParameters = require('../../../lib/semverizeParameters');
const { SchemaGotSwaggerError } = require('../../../lib/SchemaGotSwaggerError');
const swaggerMainHelper = require('../../__helpers__/swaggerMainSemverish');

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
    desiredRealizations: [],
  },
  schemes: {
    schemes: {},
    semveristConfig: {},
    targetName: 'swaggerSrc'
  },
  templates: {
    semveristConfig: {},
    templateOverrides: {},
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
