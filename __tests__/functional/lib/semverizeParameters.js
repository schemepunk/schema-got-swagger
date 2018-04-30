const SemverizeParameters = require('./../../../lib/SemverizeParameters');
const _ = require('lodash');
const { SchemaGotSwaggerError, SchemaGotSwaggerReThrownError } = require('./../../../lib/SchemaGotSwaggerError');
const semverishTest = require('./../../__helpers__/swaggerMainSemverish');
const Manifest = require('semverist/lib/supers/manifest');

let tmpMocks = [];

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
  },
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

describe('Basic functional swagger main data', () => {
  beforeEach(() => {
    tmpMocks.forEach(mock => mock.mockRestore());
    tmpMocks = [];
    jest.resetAllMocks();
    jest.spyOn(Date, 'now').mockReturnValue(2000);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  test('Valid Construction with defaults.', () => {
    expect.assertions(1);
    const semverizeParameters = new SemverizeParameters(
      semverishTest,
      'swaggerMainSrcValidator',
      {
        dataDefaultsType: 'SwaggerSrcSchemes',
        semveristConfigDefaults: 'SgsSemverist'
      },
      {
        semveristConfig: semveristToPass,
        semverishMolotov: { overrides: {}, cocktailClasses: [] },
        desiredRealizations: [],
        validate: true,
        swaggerVersion: '2.0.0',
        targetName: 'swaggerSrc',
      }
    );
    return semverizeParameters.init()
     .then((semPar) => {
       expect(semPar).toBeInstanceOf(SemverizeParameters);
     })
  })
});