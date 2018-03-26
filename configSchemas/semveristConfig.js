module.exports = {
  title: 'Semverist config schema',
  description: 'A schema describing the shape of semverist config.',
  $id: 'http://example.com/schemas/semveristConfig.json',
  type: 'object',
  additionalProperties: false,
  properties: {
    callPath: {
      description: 'A root path to use with the semverist for any plugins or functionality requiring paths.', // eslint-disable-line max-len
      type: 'string',
    },
    semveristBehaviors: {
      inheritence: {
        description: 'null, no inheritence, semverImplied - default semver elements override according to their position in the semver hierarchy, lazySemverist - semver elements override from this version upwards, across its parents and semver siblings.', // eslint-disable-line max-len
        enum: [
          null,
          'semverImplied',
          'lazySemverist',
        ],
        default: 'semverImplied',
        type: 'string',
      },
      lazySemverist: {
        description: 'Activates last occurence high water mark override for all future leaves and parents.', // eslint-disable-line max-len
        type: 'object',
        properties: {
          preReleaseForwards: {
            description: 'If you utilize prereleases, breaking changes are typically allowed as volatility, thus by default everything is forwarded inside of lazy semverist except for prereleases unless you set this to true.', // eslint-disable-line max-len
            type: 'boolean',
            default: false,
          },
          attributes: {
            description: 'The highest semver version of an attribute will be present on all subsequent semver spaces until it is specifically overridden.', // eslint-disable-line max-len
            type: 'boolean',
            default: false,
          },
        },
      },
      default: {
        description: 'Enables defaults capabilities for the semverist.',
        type: 'boolean',
        default: true,
      },
      defaultName: {
        description: 'modifies the name of defaults from /default/ to the value provided here.',
        type: 'string',
        default: 'default',
      },
      groups: {
        description: 'Enables groups capabilities for the semverist.',
        type: 'boolean',
        default: true,
      },
      mergeStrategy: {
        description: 'Merge strategies provide different options for merging attributes, groups and defaults together.', // eslint-disable-line max-len
        type: 'string',
        enum: [
          'merge',
        ],
        default: 'merge',
      },
      preReleasePattern: {
        description: 'A pattern to use to match prerelease portions of semver for your project. The default is 0-{name}.', // eslint-disable-line max-len
        type: 'string',
      },
    },
    groups: {
      type: 'object',
      description: 'Groups are arbitrary collections of specific attributes.',
      patternProperties: {
        '/+\b': {
          type: 'object',
          properties: {
            members: {
              type: 'array',
              items: {
                type: 'string',
                description: 'The names of the items within the semver structure that belong to this group.', // eslint-disable-line max-len
              },
            },
          },
        },
      },
    },
    prereleaseOrdering: {
      description: 'PreReleases are supported.  By default only greek alphas - defaults need no declaration.', // eslint-disable-line max-len
      type: 'object',
      patternProperties: {
        '^\d+$': { // eslint-disable-line no-useless-escape
          description: 'A major release number',
          type: 'object',
          patternProperties: {
            '^\d+$': { // eslint-disable-line no-useless-escape
              description: 'A minor release number',
              type: 'object',
              patternProperties: {
                '^\d+$': { // eslint-disable-line no-useless-escape
                  description: 'A patch release number',
                  type: 'array',
                  items: {
                    type: 'string',
                    description: 'The name of a prerelease. The order is significant and represents the order you wish to sort your prereleases.', // eslint-disable-line max-len
                  },
                },
              },
            },
          },
        },
      },
    },
    directoryFileIgnorePattern: {
      type: 'string',
      default: 'json$',
      description: 'A pattern supplied to klaw that will ignore any files within the structure that do not match.', // eslint-disable-line max-len
    },
    converterType: {
      type: 'string',
      description: 'Determines the converter type used to read in a semverist object. Can be default (for objects), config, (shorthand for objects in config) or directory', // eslint-disable-line max-len
      default: 'default',
      enum: [
        'config',
        'default',
        'directory',
      ],
    },
    semverishObjectLocation: {
      description: 'a path in an object, config or directory path',
      type: 'string',
    },
    composer: {
      type: 'object',
      description: 'Configuration for the rendered semverist object. This can be output to an object or directory.', // eslint-disable-line max-len
      properties: {
        composerType: {
          description: 'Choose between default (object) destination and directory to write a semverist object to a directory of your choosing.', // eslint-disable-line max-len
          enum: [
            'default',
            'directory',
          ],
        },
        destination: {
          description: 'Used with the directory composer type to specify a path for the composer to write to. This will utilize the callPath provided earlier as the base path.', // eslint-disable-line max-len
          type: 'string',
        },
        priority: {
          type: 'string',
          default: 'default',
          description: 'What element should be given priority.',
        },
      },
    },
  },
};
