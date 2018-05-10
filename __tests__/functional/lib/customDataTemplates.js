'use strict';

const SchemaGotSwagger = require('./../../../lib/index');
const SemverizeParameters = require('./../../../lib/semverizeParameters');
const { SchemaGotSwaggerError } = require('./../../../lib/SchemaGotSwaggerError');
const swaggerMainHelper = require('./../../__helpers__/customTemplatesSwagger');
const paths = require('./../../__helpers__/customPathDataItems');
const customTemplate = require('./../../__helpers__/pathsCustomTemplate');

let tmpMocks = [];

const config = {
  swaggerVersion: '2.0.0',
  apiType: 'jsonApi',
  sgsType: 'semver',
  mergeConfig: {
    sgs: true
  },
  mainSwaggerSchemeProcessName: 'processTemplates',
  realizationSource: 'paths',
  includePathsInDefinitions: true,
  pathsSchemeProcessName: 'processTemplates'
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
    validate: false,
    dataDefaultsName: 'custom'
  },
  schemes: {
    schemes: {},
    semveristConfig: {},
    targetName: 'paths',
  },
  templates: {
    semveristConfig: {},
    templates: customTemplate,
    validate: false,
    targetName: 'paths',
    dataDefaultsName: 'custom'
  }
};

const swaggerSrc = swaggerMainHelper;

describe('Index functional from schemes', () => {
  test('Simple swagger src..', () => {
    expect.assertions(2);
    const schemaGotSwagger = new SchemaGotSwagger();
    return schemaGotSwagger.init(swaggerSrc, paths, config, swaggerSrcOptions, pathsConfig)
    .then((sgs) => {
      expect(sgs).toBeInstanceOf(SchemaGotSwagger)
      // expect(sgs.getMainDataSpClass().realized).toMatchSnapshot();
      expect(sgs.realizedPathsSwagger).toMatchSnapshot();
      expect(sgs.getSwagger()).toEqual();
    });
  });
});