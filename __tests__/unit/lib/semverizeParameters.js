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

describe('Constructor Tests', () => {
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
    expect.assertions(9);
    const semverizeParameters = new SemverizeParameters(
      {test: 'example'},
      'UserInput'
    );
    expect(semverizeParameters).toBeInstanceOf(SemverizeParameters);
    expect(semverizeParameters.semveristConfigtmp).toEqual({});
    expect(semverizeParameters.defaultSemveristConfig).toEqual('SgsSemverist');
    expect(semverizeParameters.dataDefaultsType).toEqual('');
    expect(semverizeParameters.tmpData).toEqual({test: 'example'});
    expect(semverizeParameters.desiredRealizations).toEqual([]);
    expect(semverizeParameters.targetName).toEqual('swagger');
    expect(semverizeParameters.semverishMolotov).toEqual({ overrides: {}, cocktailClasses: []});
    expect(semverizeParameters.validatorId).toEqual('UserInput');
  })
});

describe('Setters', () => {
  beforeEach(() => {
    tmpMocks.forEach(mock => mock.mockRestore());
    tmpMocks = [];
    jest.resetAllMocks();
    jest.spyOn(Date, 'now').mockReturnValue(2000);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  test('Valid semverist config is ok.', () => {
    expect.assertions(2);
    const semverizeParameters = new SemverizeParameters(
      {test: 'example'},
      'UserInput'
    );
    expect(semverizeParameters.setSemveristConfig(semveristToPass)).toBeInstanceOf(SemverizeParameters)
    expect(semverizeParameters.getSemveristConfig()).toEqual(semveristToPass);
  });
  test('Invalid semverist config will throw', () => {
    expect.assertions(1);
    const semverizeParameters = new SemverizeParameters(
      {test: 'example'},
      'UserInput'
    );
    expect(() => semverizeParameters.setSemveristConfig({nope: 'nope'})).toThrow(SchemaGotSwaggerError);
  });
  test('Set semverize Realizations with good realizations.', () => {
    expect.assertions(2);
    const semverizeParameters = new SemverizeParameters(
      {test: 'example'},
      'UserInput'
    );
    expect(semverizeParameters.setSemverRealizations(['1.1.0'])).toBeInstanceOf(SemverizeParameters);
    expect(semverizeParameters.getSemverRealizations()).toEqual(['1.1.0']);
  });
  test('Invalid semverized realizations will throw', () => {
    expect.assertions(1);
    const semverizeParameters = new SemverizeParameters(
      {test: 'example'},
      'UserInput'
    );
    expect(() => semverizeParameters.setSemverRealizations('nope')).toThrow(SchemaGotSwaggerError);
  });
  test('Validator with invalid validation name throws error', () => {
    expect.assertions(1)
    const semverizeParameters = new SemverizeParameters(
      {test: 'example'},
      'UserInput'
    );
    expect(() => semverizeParameters.validator('nope', {test: 'example'})).toThrow(SchemaGotSwaggerError);
  })
});

describe('Composer related', () => {
  beforeEach(() => {
    tmpMocks.forEach(mock => mock.mockRestore());
    tmpMocks = [];
    jest.resetAllMocks();
    jest.spyOn(Date, 'now').mockReturnValue(2000);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  test('Create composer..', () => {
    expect.assertions(5);
    const semverizeParameters = new SemverizeParameters(
      {apiName: 'Swagger Example APi override'},
      'UserInput'
    );

    return SemverizeParameters.createComposer(semverishTest, { test: semveristToPass }, 'test')
    .then(value => {
      expect(value.getComposition()).toMatchSnapshot()
      semverizeParameters.parseComposerAttributes(value);
      semverizeParameters.targetName = 'swaggerSrc';
      semverizeParameters.validatorId = 'swaggerMainSrcValidator';
      semverizeParameters.dataDefaultsType = 'UserInput';
      expect(semverizeParameters.getSemverRealizations()).toEqual(
        [
          "1.0.0",
          "1.1.0",
          "1.1.1"
        ]
      );
      expect(semverizeParameters.realized).toMatchSnapshot();
      expect(semverizeParameters.composer).toBeInstanceOf(Manifest);
      expect(semverizeParameters.validateRealizedParameters()).toBeInstanceOf(SemverizeParameters);
    });

  });
});

describe('Prepare semverish', () => {
  beforeEach(() => {
    tmpMocks.forEach(mock => mock.mockRestore());
    tmpMocks = [];
    jest.resetAllMocks();
    jest.spyOn(Date, 'now').mockReturnValue(2000);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });
  test('Prepare semverish pass in semverish.', () => {
    expect.assertions(1);
    const semverizeParameters = new SemverizeParameters(
      {test: 'example'},
      'UserInput'
    );

    return semverizeParameters.prepareSemverish(semverishTest)
    .then(value => expect(value).toEqual(semverishTest));
  });

  test('Prepare semverish, non semverish', () => {
    expect.assertions(1);
    const semverizeParameters = new SemverizeParameters(
      {test: 'example'},
      'UserInput'
    );
    semverizeParameters.dataDefaultsType = 'SwaggerSrcTemplates';
    semverizeParameters.targetName = 'swagger';
    semverizeParameters.desiredRealizations = ['1.1.0', '2.0.0'];
    return semverizeParameters.prepareSemverish({test: 'example'})
    .then(value => expect(value).toMatchSnapshot());
  });

  test('Semverize To Realizations.', () => {
    expect.assertions(1);
    const semverizeParameters = new SemverizeParameters(
      {test: 'example'},
      'UserInput'
    );
    semverizeParameters.desiredRealizations = ['1.1.0', '2.0.0'];
    expect(semverizeParameters.semverizeToRealizations({test: 'example'})).toEqual(
      {"1": {"1": {"0": {"test": "example"}}}, "2": {"0": {"0": {"test": "example"}}}}
    );
  });
});

