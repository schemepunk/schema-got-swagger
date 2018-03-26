module.exports = {
  title: 'Semverish shapes',
  description: 'A semverish object is one that is organized hierarchically like a semver version number by major, minor, patch and pre-release versions', // eslint-disable-line max-len
  $id: 'http://example.com/schemas/semverish.json',
  type: 'object',
  patternProperties: {
    '^\\d+$': { // eslint-disable-line no-useless-escape
      type: 'object',
      description: 'A number corresponding to a major version within semver.',
      patternProperties: {
        '^\\d+$': { // eslint-disable-line no-useless-escape
          type: 'object',
          description: 'A number corresponding to a minor version within semver under the major version that is hierarchically above it.', // eslint-disable-line max-len
          patternProperties: {
            '^\\d+$': { // eslint-disable-line no-useless-escape
              type: 'object',
              description: 'A number corresponding to a patch version within semver under the minor version that is hierarchically above it.', // eslint-disable-line max-len
              patternProperties: {
                '^\\D.+$': { // eslint-disable-line no-useless-escape
                  description: 'A semverish attribute at the patch level. For semverImplied inheritence attributes at this level will be inherited by all minor versions under this major version and so forth on down until overriden. For lazy semverist inheritence this attribute will be persisted from the earliest complete semver value on forwards until overridden.', // eslint-disable-line max-len
                  anyOf: [
                    {
                      type: 'string',
                    },
                    {
                      type: 'number',
                    },
                    {
                      type: 'object',
                    },
                    {
                      type: 'boolean',
                    },
                    {
                      type: 'array',
                    },
                  ],
                },
              },
            },
            '^\\d+-.+$': { // eslint-disable-line no-useless-escape
              type: 'object',
              description: 'A name of a pre-release version with semver under the minor version that is hierarchically above it.', // eslint-disable-line max-len
              patternProperties: {
                '^\\D.+$': { // eslint-disable-line no-useless-escape
                  description: 'A semverish attribute at the pre-release level. For semverImplied inheritence attributes at this level will be inherited by all minor versions under this major version and so forth on down until overriden. For lazy semverist inheritence this attribute will be persisted from the earliest complete semver value on forwards until overridden. ', // eslint-disable-line max-len
                  anyOf: [
                    {
                      type: 'string',
                    },
                    {
                      type: 'number',
                    },
                    {
                      type: 'object',
                    },
                    {
                      type: 'boolean',
                    },
                    {
                      type: 'array',
                    },
                  ],
                },
                '^\\d+-.+$': { // eslint-disable-line no-useless-escape
                  type: 'object',
                  description: 'The number of a pre-release patch with semver under the pre-release version that is hierarchically above it.', // eslint-disable-line max-len
                  patternProperties: {
                    '^\\D.+$': { // eslint-disable-line no-useless-escape
                      description: 'A semverish attribute at the pre-release patch level. For semverImplied inheritence attributes at this level will be inherited by all minor versions under this major version and so forth on down until overriden. For lazy semverist inheritence this attribute will be persisted from the earliest complete semver value on forwards until overridden. ', // eslint-disable-line max-len
                      anyOf: [
                        {
                          type: 'string',
                        },
                        {
                          type: 'number',
                        },
                        {
                          type: 'object',
                        },
                        {
                          type: 'boolean',
                        },
                        {
                          type: 'array',
                        },
                      ],
                    },
                  },
                },
              },
            },
            '^\\D.+$': { // eslint-disable-line no-useless-escape
              description: 'A semverish attribute at the minor level. For semverImplied inheritence attributes at this level will be inherited by all minor versions under this major version and so forth on down until overriden. For lazy semverist inheritence this attribute will be persisted from the earliest complete semver value on forwards until overridden. ', // eslint-disable-line max-len
              anyOf: [
                {
                  type: 'string',
                },
                {
                  type: 'number',
                },
                {
                  type: 'object',
                },
                {
                  type: 'boolean',
                },
                {
                  type: 'array',
                },
              ],
            },
          },
          additionalProperites: false,
        },
        '^\\D.+$': { // eslint-disable-line no-useless-escape
          description: 'A semverish attribute at the major level. For semverImplied inheritence attributes at this level will be inherited by all minor versions under this major version and so forth on down until overriden. For lazy semverist inheritence this attribute will be persisted from the earliest complete semver value on forwards until overridden. ', // eslint-disable-line max-len
          anyOf: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
            {
              type: 'object',
            },
            {
              type: 'boolean',
            },
            {
              type: 'array',
            },
          ],
        },
      },
      additionalProperites: false,
    },
    additionalProperties: false,
  },
  additionalProperties: false,
};
