'use strict';

const SchemaGotSwagger = require('../../lib/index');
const { SchemaGotSwaggerError } = require('../../lib/SchemaGotSwaggerError');
const swaggerMainHelper = require('../__helpers__/swaggerMainSemverish');

let tmpMocks = [];

beforeEach(() => {
  tmpMocks.forEach(mock => mock.mockRestore());
  tmpMocks = [];
  jest.resetAllMocks();
  jest.spyOn(Date, 'now').mockReturnValue(2000);
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('Sgs basic gets', () => {
  test('Get config', () => {
    expect.assertions(1);
    const schemaGotSwagger = new SchemaGotSwagger();
    schemaGotSwagger.config = {test: 'test'};
    expect(schemaGotSwagger.getConfig()).toEqual({test:'test'})
  });
});

describe('test initialization', () => {
  test('basic init', () => {
    expect.assertions(2);
    const schemaGotSwaggerInit = new SchemaGotSwagger();
    return schemaGotSwaggerInit.init(swaggerMainHelper, {})
    .then(ret => {
      expect(ret).toBeInstanceOf(SchemaGotSwagger);
      expect(ret.getSwaggerSrc()).toMatchSnapshot();
    })
    .catch(e => console.log(e));
  })
})

describe('Bad Config', () => {
  test('bad config throws', () => {
    expect.assertions(1);
    const schemaGotSwaggerInit = new SchemaGotSwagger();
    return schemaGotSwaggerInit.init(swaggerMainHelper, {}, { dumpydoodle: 'bad', mergeConfig: { sgs: false}})
    .catch(e => expect(e).toBeInstanceOf(SchemaGotSwaggerError));
  })
})

describe('Not a semverist shape.', () => {
  test('Non semverist shape throws', () => {
    expect.assertions(1);
    const schemaGotSwaggerInit = new SchemaGotSwagger();
    return schemaGotSwaggerInit.init({nunchuks: 'nope'}, {},)
    .catch(e => expect(e).toBeInstanceOf(SchemaGotSwaggerError));
  })
})

describe('Semverist object maker', () => {
  test('Semverist rocks', () => {
    expect.assertions(1);
    const schemaGotSwagger = new SchemaGotSwagger();
    schemaGotSwagger.setSwaggerSemverRealizations(['1.1.0', '1.1.1', '1.1.0-alpha.0'])
    expect(schemaGotSwagger.semverizeToRealizations('example', {test: 'what'})).toEqual({"1": {"1": {"0": {"[object Object]": "example", "alpha.0": {"[object Object]": "example"}}, "1": {"[object Object]": "example"}}}});
 })
});

describe('Composer creator errors with bad params', () => {
  test('Bad params throws', () => {
    expect.assertions(1);
    expect(() => SchemaGotSwagger.createComposer('junk', 'junk', 'unk')).toThrow();
  })
})

describe('Semverist Src Data', () => {
  const schemaGotSwaggerConfig = {
    swaggerVersion: '2.0.0',
    apiType: 'jsonApi',
    sgsType: 'semver',
    mergeConfig: {
      sgs: true,
      swaggersrcsemverist: true,
      swaggermaintemplate: true,
      swaggersrctemplatesemverist: true,
      swaggersrcschemes: true,
    }
  }
  const semveristToPass = {
    semveristBehaviors: {
      inheritence: 'lazySemverist',
      lazySemverist: {
        preReleaseForwards: false,
        attributes: false,
      },
      default: false,
      defaultName: 'default',
      groups: false,
      mergeStrategy: 'merge',
      preReleasePattern: "[a-z]",
      groups: {
        swagger: {
          members: [
            'swagger'
          ],
        },
      },
      prereleaseOrdering: {},
      directoryFileIgnorePattern: 'json$',
      converterType: 'default',
      semverishObjectLocation: '',
      composer: {
        composerType: 'default',
        destination: "",
        priority: 'default'
      }
    }
  }

  const semveristSrcData = {
    data: {
      semveristConfig: semveristToPass
    },
    schemes: {
      schemes: {
        source: {
          target: 'swaggerSource',
          plugin: 'originalSchemeSource',
        },
        transform: {
          plugin: 'tokenTemplateValues',
          named: false,
          json: true,
          unescape: false,
        },
        destination: {
          target: 'swaggerSource'
        },
      },
      semveristConfig: semveristToPass
    },
    templates: {
      semveristConfig: semveristToPass,
      templateOverrides:{
        title: '{{apiName}}',
        description: '{{apiDescription}}',
        version: '{{apiVersion}}',
        termsOfService: '{{termsOfService}}',
        contact: '{{=<% %>=}}{<%={{ }}=%> "name": "{{contact.name}}", "url": "{{&contact.url}}", "email": "{{contact.email}}" {{=<% %>=}}}<%={{ }}=%>', // eslint-disable-line max-len
        license: '{{=<% %>=}}{ "name": "<%license.name%>", "url": "<%&license.url%>"}<%={{ }}=%>',
        host: '{{apiHost}}',
        basePath: '{{apiBasePath}}',
        schemes: '{{#schemes}}{{&process}}{{/schemes}}',
        consumes: '[{{#consumes}}"{{mime.type}}"{{#mime.comma}}, {{/mime.comma}}{{/consumes}}]',
        produces: '[{{#produces}}"{{mime.type}}"{{#mime.comma}}, {{/mime.comma}}{{/produces}}]',
        definitions: '{{#definitions}}{{&process}}{{/definitions}}',
        parameters: '{{#parameters}}{{&process}}{{/parameters}}',
        responses: '{{#responses}}{{&process}}{{/responses}}',
        securityDefinitions: '{{#securityDefinitions}}{{&process}}{{/securityDefinitions}}',
        security: '{{#security}}{{&process}}{{/security}}',
        tags: '{{#tags}}{{&process}}{{/tags}}',
        externalDocs: '{{#externalDocs}}{{=<% %>=}}{<%={{ }}=%>{{#description}}"description": "{{description}}", {{/description}}"url": "{{&url}}"{{=<% %>=}}}<%={{ }}=%>{{/externalDocs}}', // eslint-disable-line max-len
        destinationTemplate: '{{=<% %>=}}{<%={{ }}=%>"swagger": "2.0", "info": {{=<% %>=}}{<%={{ }}=%> "title": "{{> title}}", {{#description}}"description": "{{> description}}",{{/description}} {{#termsOfService}}termsOfService: "{{> termsOfService}}",{{/termsOfService}} "version": "{{> version}}", {{#contact}}"contact": {{> contact}},{{/contact}} {{#license}}"license": {{> license}}{{/license}}{{=<% %>=}}}<%={{ }}=%>, {{#host}}"host": "{{> host}}",{{/host}} {{#basePath}}"basePath": "{{> basePath}}",{{/basePath}} {{#schemes}}"schemes": {{> schemes}}, {{/schemes}} {{#consumes}}"consumes": {{> consumes}}, {{/consumes}} {{#produces}}"produces": {{> produces}}, {{/produces}} "paths": {}, {{#definitions}}"definitions": {{> definitions}},{{/definitions}} {{#parameters}}"parameters": {{> parameters }},{{/parameters}} {{#responses}}"responses": {{> responses }},{{/responses}} {{#securityDefinitions}}"securityDefinitions": {{> securityDefinitions}},{{/securityDefinitions}} {{#security}}"security": {{> security}},{{/security}} {{#tags}}"tags": {{> tags}},{{/tags}} {{#externalDocs}}"externalDocs": {{> externalDocs}}{{/externalDocs}} {{=<% %>=}}}<%={{ }}=%>', // eslint-disable-line max-len
      },
    }
  }
  test('Semverist Src Data', () => {
    expect.assertions(2);
    const schemaGotSwaggerInit = new SchemaGotSwagger();
    return schemaGotSwaggerInit.init(swaggerMainHelper, {}, schemaGotSwaggerConfig, semveristSrcData)
    .then(ret => {
      expect(ret).toBeInstanceOf(SchemaGotSwagger);
      expect(ret.getSwaggerSrc()).toMatchSnapshot();
    })
  })
})