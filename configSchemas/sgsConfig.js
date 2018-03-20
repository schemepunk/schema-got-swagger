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
      description: 'The type of api your swagger document supports. Json Api is the default and supported. Custom allows you to do w/e you wish.',
      default: 'jsonApi',
      enum: [
        'custom',
        'jsonApi',
      ],
    },
    mergeConfig: {
      type: 'object',
      description: 'This configuration option allows you to control whether implementation provided configuration and options are merged with default settings. By default all implementation specific configuration will be merged with Schema got swagger defaults.',
      properties: {
        Sgs: true,
      },
    },
    sgsType: {
      type: 'string',
      description: 'The Swagger Got Schema Type. You can provide either a semver or semverish shaped object to inform your swagger generation or simple objects.',
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
