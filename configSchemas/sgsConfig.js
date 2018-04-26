module.exports = {
  title: 'Schema Got Swagger Config Schema',
  description: 'A schema describing the shape of sgs config.',
  $id: 'http://example.com/schemas/sgsConfig.json',
  type: 'object',
  required: [
    'swaggerVersion',
    'apiType',
    'sgsType',
  ],
  additionalProperties: false,
  properties: {
    apiType: {
      type: 'string',
      description: 'The type of api your swagger document supports. Json Api is the default and supported. Custom allows you to do w/e you wish.', // eslint-disable-line max-len
      default: 'jsonApi',
      enum: [
        'custom',
        'jsonApi',
      ],
    },
    mainSwaggerSchemeProcessName: {
      type: 'string',
      default: 'processTemplates',
      description: 'Using defaults the process name under the scheme targetName is set to processTemplates. You can change it here if you provide your own schemes for the schemePunk processing of the main swagger file.', // eslint-disable-line max-len
    },
    mergeConfig: {
      type: 'object',
      description: 'This configuration option allows you to control whether implementation provided configuration and options are merged with default settings. By default all implementation specific configuration will be merged with Schema got swagger defaults.', // eslint-disable-line max-len
      properties: {
        sgs: {
          type: 'boolean',
          description: 'Whether to merge sgs config.',
        },
      },
    },
    sgsType: {
      type: 'string',
      description: 'The Swagger Got Schema Type. You can provide either a semver or semverish shaped object to inform your swagger generation or simple objects.', // eslint-disable-line max-len
      enum: [
        'semver',
        'simple',
      ],
    },
    swaggerVersion: {
      type: 'string',
      description: 'A valid semver string relating to the version of swagger you wish to produce.',
      enum: [
        '2.0.0',
        '3.0.0',
      ],
      default: '3.0.0',
    },
  },
};
