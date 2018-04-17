module.exports = {
  1: {
    0: {
      swaggerSrc: {
        apiName: 'Swagger Example APi',
        apiVersion: '3.14.0',
        apiDescription: 'An example Api for example corp.',
        termsOfService: '',
        contact: {
          name: 'Dave Example',
          url: 'http://example.com',
          email: 'example@example.com',
        },
        license: {
          name: 'apache 2.0',
          url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
        },
        apiHost: 'example.com',
        apiBasePath: '/api',
        schemes: {
          process: null,
          items: [
            'https',
            'http',
          ],
        },
        consumes: [{
          mime: {
            type: 'vnd.api+json',
            comma: false,
          },
        }],
        produces: [{
          mime: {
            type: 'vnd.api+json',
            comma: false,
          },
        }],
        definitions: {
          process: null,
          items: {
            example: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  format: 'int64',
                },
                name: {
                  type: 'string',
                },
              },
            },
            example2: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
              },
            },
          },
        },
        parameters: {
          process: null,
          items: {
            skipParam: {
              name: 'skip',
              in: 'query',
              description: 'number of items to skip',
              required: true,
              type: 'integer',
              format: 'int32',
            },
          },
        },
        responses: {
          process: null,
          items: {
            notFound: {
              description: 'Entity not found.',
            },
            IllegalInput: {
              description: 'Illegal input for operation.',
            },
            GeneralError: {
              description: 'General Error',
            },
          },
        },
        securityDefinitions: {
          process: null,
          items: {
            api_key: {
              type: 'apiKey',
              name: 'api_key',
              in: 'header',
            },
            petstore_auth: {
              type: 'oauth2',
              authorizationUrl: 'http://swagger.io/api/oauth/dialog',
              flow: 'implicit',
              scopes: {
                'write.pets': 'modify pets in your account',
                'read.pets': 'read your pets',
              },
            },
          },
        },
        security: {
          process: null,
          items: {
            petstore_auth: [
              'write:pets',
              'read:pets',
            ],
          },
        },
        tags: {
          process: null,
          items: [
            {
              name: 'pet',
              description: 'Pets operations',
              externalDocs: {
                description: 'pet docs',
                url: 'http://example.com/pet',
              },
            },
            {
              name: 'carrot',
              description: 'Vegetable',
            },
          ],
        },
        externalDocs: {
          description: 'Further api docs',
          url: 'http://example.com/docs',
        },
      },
    },
    1: {
      swaggerSrc: {
        apiName: 'Swagger Example APi',
        apiVersion: '3.14.0',
        apiDescription: 'An example Api for example corp.',
        termsOfService: '',
        contact: {
          name: 'Dave Example',
          url: 'http://example.com',
          email: 'example@example.com',
        },
        license: {
          name: 'apache 2.0',
          url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
        },
        apiHost: 'example.com',
        apiBasePath: '/api',
        schemes: {
          process: null,
          items: [
            'https',
            'http',
          ],
        },
        consumes: [{
          mime: {
            type: 'vnd.api+json',
            comma: false,
          },
        }],
        produces: [{
          mime: {
            type: 'vnd.api+json',
            comma: false,
          },
        }],
        definitions: {
          process: null,
          items: {
            example: {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  format: 'int64',
                },
                name: {
                  type: 'string',
                },
              },
            },
            example2: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                },
              },
            },
          },
        },
        parameters: {
          process: null,
          items: {
            skipParam: {
              name: 'skip',
              in: 'query',
              description: 'number of items to skip',
              required: true,
              type: 'integer',
              format: 'int32',
            },
          },
        },
        responses: {
          process: null,
          items: {
            notFound: {
              description: 'Entity not found.',
            },
            IllegalInput: {
              description: 'Illegal input for operation.',
            },
            GeneralError: {
              description: 'General Error',
            },
          },
        },
        securityDefinitions: {
          process: null,
          items: {
            api_key: {
              type: 'apiKey',
              name: 'api_key',
              in: 'header',
            },
            petstore_auth: {
              type: 'oauth2',
              authorizationUrl: 'http://swagger.io/api/oauth/dialog',
              flow: 'implicit',
              scopes: {
                'write.pets': 'modify pets in your account',
                'read.pets': 'read your pets',
              },
            },
          },
        },
        security: {
          process: null,
          items: {
            petstore_auth: [
              'write:pets',
              'read:pets',
            ],
          },
        },
        tags: {
          process: null,
          items: [
            {
              name: 'pet',
              description: 'Pets operations',
              externalDocs: {
                description: 'pet docs',
                url: 'http://example.com/pet',
              },
            },
            {
              name: 'carrot',
              description: 'Vegetable',
            },
          ],
        },
        externalDocs: {
          description: 'Further api docs',
          url: 'http://example.com/docs',
        },
      },
      1: {
        swaggerSrc: {
          apiName: 'Swagger Example APi',
          apiVersion: '3.14.0',
          apiDescription: 'An example Api for example corp.',
          termsOfService: '',
          contact: {
            name: 'Dave Example',
            url: 'http://example.com',
            email: 'example@example.com',
          },
          license: {
            name: 'apache 2.0',
            url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
          },
          apiHost: 'example.com',
          apiBasePath: '/api',
          schemes: {
            process: null,
            items: [
              'https',
              'http',
            ],
          },
          consumes: [{
            mime: {
              type: 'vnd.api+json',
              comma: false,
            },
          }],
          produces: [{
            mime: {
              type: 'vnd.api+json',
              comma: false,
            },
          }],
          definitions: {
            process: null,
            items: {
              example: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    format: 'int64',
                  },
                  name: {
                    type: 'string',
                  },
                },
              },
              example2: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                  },
                },
              },
            },
          },
          parameters: {
            process: null,
            items: {
              skipParam: {
                name: 'skip',
                in: 'query',
                description: 'number of items to skip',
                required: true,
                type: 'integer',
                format: 'int32',
              },
            },
          },
          responses: {
            process: null,
            items: {
              notFound: {
                description: 'Entity not found.',
              },
              IllegalInput: {
                description: 'Illegal input for operation.',
              },
              GeneralError: {
                description: 'General Error',
              },
            },
          },
          securityDefinitions: {
            process: null,
            items: {
              api_key: {
                type: 'apiKey',
                name: 'api_key',
                in: 'header',
              },
              petstore_auth: {
                type: 'oauth2',
                authorizationUrl: 'http://swagger.io/api/oauth/dialog',
                flow: 'implicit',
                scopes: {
                  'write.pets': 'modify pets in your account',
                  'read.pets': 'read your pets',
                },
              },
            },
          },
          security: {
            process: null,
            items: {
              petstore_auth: [
                'write:pets',
                'read:pets',
              ],
            },
          },
          tags: {
            process: null,
            items: [
              {
                name: 'pet',
                description: 'Pets operations',
                externalDocs: {
                  description: 'pet docs',
                  url: 'http://example.com/pet',
                },
              },
              {
                name: 'carrot',
                description: 'Vegetable',
              },
            ],
          },
          externalDocs: {
            description: 'Further api docs',
            url: 'http://example.com/docs',
          },
        },
      },
    },
  },
};
