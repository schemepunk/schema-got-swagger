module.exports = {
  1: {
    0: {
      0: {
        'type--story': {
          $schema: 'http://json-schema.org/draft-07/schema',
          $id: 'type--story',
          description: 'Object containing content and references pertaining to an audio episode.',
          type: 'object',
          definitions: {
            entityCommonName: {
              type: 'string',
              default: 'story',
            },
            entityPluralName: {
              type: 'string',
              default: 'stories',
            },
            entityOperationIdName: {
              type: 'string',
              default: 'Story',
            },
            entityPathName: {
              type: 'string',
              default: 'type--story',
            },
          },
          required: ['data'],
          properties: {
            data: {
              type: 'object',
              required: ['type', 'id'],
              properties: {
                id: {
                  type: 'string',
                  description: 'An Id.',
                },
                type: {
                  type: 'string',
                  default: 'story',
                },
                attributes: {
                  additionalProperties: true,
                  type: 'object',
                  required: ['id', 'self'],
                  properties: {
                    testProp1: {
                      type: 'string',
                      description: 'A test property 1',
                    },
                    testProp2: {
                      type: 'string',
                      description: 'A test property 1',
                    },
                  },
                },
              },
            },
          },
        },
        'type--article': {
          $schema: 'http://json-schema.org/draft-07/schema',
          $id: 'type--article',
          description: 'Object containing content and references pertaining to an article.',
          type: 'object',
          definitions: {
            entityCommonName: {
              type: 'string',
              default: 'article',
            },
            entityPluralName: {
              type: 'string',
              default: 'articles',
            },
            entityOperationIdName: {
              type: 'string',
              default: 'Article',
            },
            entityPathName: {
              type: 'string',
              default: 'type--article',
            },
          },
          required: ['data'],
          properties: {
            data: {
              type: 'object',
              required: ['type', 'id'],
              properties: {
                id: {
                  type: 'string',
                  description: 'An Id.',
                },
                type: {
                  type: 'string',
                  default: 'story',
                },
                attributes: {
                  additionalProperties: true,
                  type: 'object',
                  required: ['id', 'self'],
                  properties: {
                    testProp1: {
                      type: 'string',
                      description: 'A test property 1',
                    },
                    testProp2: {
                      type: 'string',
                      description: 'A test property 1',
                    },
                  },
                },
              },
            },
          },
        },
        'type--video': {
          $schema: 'http://json-schema.org/draft-07/schema',
          $id: 'type--story',
          description: 'Object containing content and references pertaining to a video.',
          type: 'object',
          definitions: {
            entityCommonName: {
              type: 'string',
              default: 'video',
            },
            entityPluralName: {
              type: 'string',
              default: 'videos',
            },
            entityOperationIdName: {
              type: 'string',
              default: 'Video',
            },
            entityPathName: {
              type: 'string',
              default: 'type--video',
            },
          },
          required: ['data'],
          properties: {
            data: {
              type: 'object',
              required: ['type', 'id'],
              properties: {
                id: {
                  type: 'string',
                  description: 'An Id.',
                },
                type: {
                  type: 'string',
                  default: 'story',
                },
                attributes: {
                  additionalProperties: true,
                  type: 'object',
                  required: ['id', 'self'],
                  properties: {
                    testProp1: {
                      type: 'string',
                      description: 'A test property 1',
                    },
                    testProp2: {
                      type: 'string',
                      description: 'A test property 1',
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
