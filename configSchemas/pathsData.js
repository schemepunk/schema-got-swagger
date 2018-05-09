module.exports = {
  title: 'Swagger Got Schema paths data.',
  description: 'A schema describing the shape of paths data for Schema got swagger.',
  $id: 'http://example.com/schemas/pathsData.json',
  type: 'object',
  additionalProperties: true,
  required: [
    'paths',
  ],
  properties: {
    definitions: {
      type: 'object',
      description: 'Definitions to be shared across the api. Useful for common entity definitions etc.', // eslint-disable-line max-len
      additionalProperties: true,
      properties: {},
    },
    paths: {
      type: 'array',
      description: 'Path item data',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          pathItem: {
            type: 'string',
            description: 'An api path that can have operations against it.',
          },
          last: {
            type: 'boolean',
            description: 'Include this property on the last operation to ensure proper json output in the template.', // eslint-disable-line max-len
          },
          $ref: {
            type: 'string',
            description: 'A json ref pointer to an external paths definition.',
          },
          parameters: {
            type: 'object',
            description: 'A parameters object to be shared amongst all path items.',
            properties: {
              items: {
                type: 'object',
                description: 'An object that represents a parameter that conforms to the format for swagger paramters.', // eslint-disable-line max-len
                additionalProperties: true,
              },
            },
          },
          operations: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              description: 'Operations on a path such as get, put, patch, options etc.',
              required: ['operationId', 'responses'],
              properties: {
                operationName: {
                  type: 'string',
                  description: 'Matches up to the method type or operation quality. Such as get, put etc.', // eslint-disable-line max-len
                },
                comma: {
                  type: 'boolean',
                  description: 'Helps with formatting the operation as a json object in the operations array. Use it to include a comma at the end of this object.', // eslint-disable-line max-len
                },
                description: {
                  type: 'string',
                  description: 'A description of this operation',
                },
                deprecated: {
                  type: 'boolean',
                  description: 'A boolean indicating that this operation is deprecated.',
                },
                schemes: {
                  type: 'string',
                  description: 'Overrides the swagger schemes definition for this operation',
                },
                summary: {
                  type: 'string',
                  description: 'A summary of this operation.',
                },
                operationId: {
                  type: 'string',
                  description: 'A unique identifier for this operation.',
                },
                produces: {
                  type: 'object',
                  properties: {
                    items: {
                      type: 'array',
                      description: 'Mime strings for the produces attribute in an array',
                      items: {
                        type: 'string',
                      },
                    },
                  },
                },
                consumes: {
                  type: 'object',
                  properties: {
                    items: {
                      type: 'array',
                      description: 'Mime strings for the consumes attribute in an array',
                      items: {
                        type: 'string',
                      },
                    },
                  },
                },
                responses: {
                  type: 'object',
                  additionalProperties: true,
                  description: 'An object filled with items to be used with a function process parameter to convert it to json.', // eslint-disable-line max-len
                  properties: {
                    items: {
                      type: 'object',
                      description: 'A response object, keyed by the responses code in swagger response format.', // eslint-disable-line max-len
                      properties: {},
                      additionalProperties: true,
                    },
                  },
                },
                parameters: {
                  type: 'object',
                  description: 'A parameters object for this operation.',
                  properties: {
                    items: {
                      type: 'object',
                      description: 'An object that represents a parameter that conforms to the format for swagger paramters.', // eslint-disable-line max-len
                      additionalProperties: true,
                    },
                  },
                },
                security: {
                  type: 'object',
                  description: 'An object to hold declarations of which security schemes are applied for the API as a whole.', // eslint-disable-line max-len
                  additionalProperties: true,
                  properties: {
                    items: {
                      type: 'object',
                      additionalProperties: {
                        type: 'array',
                        description: 'Items are each declarations of security schemes', // eslint-disable-line max-len
                        items: {
                          type: 'string',
                        },
                      },
                    },
                  },
                },
                tags: {
                  type: 'object',
                  description: 'An object to hold a list of tags used by the specification with additional metadata', // eslint-disable-line max-len
                  additionalProperties: true,
                  properties: {
                    items: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          name: {
                            type: 'string',
                            description: 'A tag name',
                          },
                          description: {
                            type: 'string',
                            description: 'A description of the tag.',
                          },
                          url: {
                            type: 'string',
                            description: 'A url associated with this tag.',
                          },
                        },
                      },
                    },
                  },
                },
                externalDocs: {
                  type: 'object',
                  description: 'A description and url for any external documenation for this api.',
                  properties: {
                    description: {
                      type: 'string',
                      description: 'A description of the external documentation for this api.',
                    },
                    url: {
                      type: 'string',
                      description: 'A url for the external docs of this api.',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

