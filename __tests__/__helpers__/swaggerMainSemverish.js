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
          process: function() {return JSON.stringify(this.items)}, // eslint-disable-line
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
          process: function() {return JSON.stringify(this.items)}, // eslint-disable-line
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
          process: function() {return JSON.stringify(this.items)}, // eslint-disable-line
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
          process: function() {return JSON.stringify(this.items)}, // eslint-disable-line
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
          process: function() {return JSON.stringify(this.items)},  // eslint-disable-line
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
          process: function() {return JSON.stringify(this.items)}, // eslint-disable-line
          items: {
            petstore_auth: [
              'write:pets',
              'read:pets',
            ],
          },
        },
        tags: {
          process: function() {return JSON.stringify(this.items)}, // eslint-disable-line
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
          process: function() {return JSON.stringify(this.items)}, // eslint-disable-line
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
          process: function() {return JSON.stringify(this.items)}, // eslint-disable-line
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
          process: function() {return JSON.stringify(this.items)}, // eslint-disable-line
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
          process: function() {return JSON.stringify(this.items)}, // eslint-disable-line
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
          process: function() {return JSON.stringify(this.items)}, // eslint-disable-line
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
          process: function() {return JSON.stringify(this.items)}, // eslint-disable-line
          items: {
            petstore_auth: [
              'write:pets',
              'read:pets',
            ],
          },
        },
        tags: {
          process: function() {return JSON.stringify(this.items)}, // eslint-disable-line
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
            process: function() {return JSON.stringify(this.items)}, // eslint-disable-line
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
            process: function() {return JSON.stringify(this.items)}, // eslint-disable-line
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
            process: function() {return JSON.stringify(this.items)}, // eslint-disable-line
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
            process: function() {return JSON.stringify(this.items)}, // eslint-disable-line
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
            process: function() {return JSON.stringify(this.items)}, // eslint-disable-line
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
            process: function() {return JSON.stringify(this.items)}, // eslint-disable-line
            items: {
              petstore_auth: [
                'write:pets',
                'read:pets',
              ],
            },
          },
          tags: {
            process: function() {return JSON.stringify(this.items)}, // eslint-disable-line
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
