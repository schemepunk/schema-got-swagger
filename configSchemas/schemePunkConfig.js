module.exports = {
  title: 'Schemepunk schemes',
  description: 'This is a schema describing a schemepunk scheme',
  $id: 'http://example.com/schemas/schemePunkConfig.json',
  type: 'object',
  properties: {},
  additionalProperties: {
    type: 'array',
    minItems: 1,
    items: {
      type: 'array',
      maxItems: 1,
      items: {
        type: 'object',
        required: [
          'source',
          'transform',
          'destination',
        ],
        additionalProperties: false,
        properties: {
          source: {
            type: 'object',
            properties: {
              target: {
                oneOf: [
                  { type: 'string' },
                  { type: 'object' },
                ],
              },
              plugin: {
                type: 'string',
              },
            },
            additionalProperties: true,
          },
          transform: {
            type: 'object',
            properties: {
              target: {
                type: 'string',
              },
              plugin: {
                type: 'string',
              },
            },
            additionalProperties: true,
          },
          destination: {
            type: 'object',
            properties: {
              target: {
                type: 'string',
              },
              plugin: {
                type: 'string',
              },
            },
            additionalProperties: true,
          },
          holdOvers: {
            type: 'object',
            properties: {
              src: {
                type: 'object',
                additionalProperties: {
                  type: 'string',
                },
              },
            },
            additionalProperties: {
              type: 'string',
            },
          },
        },
      },
    },
  },
};
