const swaggerMainData = require('./swaggerMainData');

module.exports = {
  title: 'Semverish shapes',
  description: 'A semverish object is one that is organized hierarchically like a semver version number by major, minor, patch and pre-release versions', // eslint-disable-line max-len
  $id: 'http://example.com/schemas/semverishMainData.json',
  type: 'object',
  definitions: {
    swaggerData: {
      type: 'object',
      additionalProperties: false,
      required: [
        'apiName',
        'apiVersion',
      ],
      properties: {
        apiName: {
          type: 'string',
          description: 'The name of the api that this swagger file describes.',
        },
        apiVersion: {
          type: 'string',
          description: 'A semantic version string.',
        },
        apiDescription: {
          type: 'string',
          description: 'A description of the api to which this swagger file relates. Can accept GFM syntax.', // eslint-disable-line max-len
        },
        termsOfService: {
          type: 'string',
          description: 'Any terms of service for the api.',
        },
        contact: {
          type: 'object',
          description: 'Contact information for this api.',
          properties: {
            name: {
              type: 'string',
              description: 'The contact name for this api.',
            },
            url: {
              type: 'string',
              description: 'A url associated with the contact for this api.',
            },
            email: {
              type: 'string',
              description: 'An email associated with the contact for this api.',
            },
          },
        },
        license: {
          type: 'object',
          description: 'Details about the license for this api.',
          properties: {
            name: {
              type: 'string',
              description: 'The name of the license type for this api.',
            },
            url: {
              type: 'string',
              description: 'A url associated with the license for this api.',
            },
          },
        },
        apiHost: {
          type: 'string',
          description: 'The api host or base url for this Api.',
        },
        apiBasePath: {
          type: 'string',
          description: 'A base path, if any for this api.',
        },
        schemes: {
          type: 'object',
          description: 'An array of schemes for this api',
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'string',
                description: 'Schemes Ex: http, https',
              },
            },
          },
          additionalProperties: true,
        },
        consumes: {
          type: 'array',
          description: 'The mime types that can be conusmed by this api.',
          items: {
            type: 'object',
            description: 'A mime type',
            properties: {
              type: {
                type: 'string',
                description: 'A mime type.',
              },
              comma: {
                type: 'boolean',
                description: 'Whether to include a comma, (true) or not (false) in the swagger realization of consumes', // eslint-disable-line max-len
              },
            },
          },
        },
        produces: {
          type: 'array',
          description: 'The mime types that are produced by this api.',
          items: {
            type: 'object',
            description: 'A mime type',
            properties: {
              type: {
                type: 'string',
                description: 'A mime type.',
              },
              comma: {
                type: 'boolean',
                description: 'Whether to include a comma, (true) or not (false) in the swagger realization of consumes', // eslint-disable-line max-len
              },
            },
          },
        },
        definitions: {
          type: 'object',
          description: 'Any shared definitions to be referenced throughout the swagger file.',
          additionalProperties: true,
          properties: {
            items: {
              type: 'object',
              additionalProperties: {
                type: 'object',
                description: 'Items are keyed by definition name and represent json schema objects that can be referenced in throughout the swagger file.', // eslint-disable-line max-len
              },
            },
          },
        },
        parameters: {
          type: 'object',
          description: 'An object to store parameters to be used across operations.',
          additionalProperties: true,
          properties: {
            items: {
              type: 'object',
              additionalProperties: {
                type: 'object',
                description: 'Items are each a parameter definition.', // eslint-disable-line max-len
              },
            },
          },
        },
        responses: {
          type: 'object',
          description: 'An object to hold responses that can be used across operations.',
          additionalProperties: true,
          properties: {
            items: {
              type: 'object',
              additionalProperties: {
                type: 'object',
                description: 'Items are each a response.', // eslint-disable-line max-len
              },
            },
          },
        },
        securityDefinitions: {
          type: 'object',
          description: 'An object to hold security definitions that can be used across the specification.', // eslint-disable-line max-len
          additionalProperties: true,
          properties: {
            items: {
              type: 'object',
              additionalProperties: {
                type: 'object',
                description: 'Items are each a security definition', // eslint-disable-line max-len
              },
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
                '^\\D.+$': { $ref: '#/definitions/swaggerData' },
              },
            },
            '^\\d+-.+$': { // eslint-disable-line no-useless-escape
              type: 'object',
              description: 'A name of a pre-release version with semver under the minor version that is hierarchically above it.', // eslint-disable-line max-len
              patternProperties: {
                '^\\D.+$': { $ref: '#/definitions/swaggerData' },
                '^\\d+-.+$': { // eslint-disable-line no-useless-escape
                  type: 'object',
                  description: 'The number of a pre-release patch with semver under the pre-release version that is hierarchically above it.', // eslint-disable-line max-len
                  patternProperties: {
                    '^\\D.+$': { $ref: '#/definitions/swaggerData' },
                  },
                },
              },
            },
            '^\\D.+$': { $ref: '#/definitions/swaggerData' },
          },
          additionalProperites: false,
        },
        '^\\D.+$': { $ref: '#/definitions/swaggerData' },
      },
      additionalProperites: false,
    },
    additionalProperties: false,
  },
  additionalProperties: false,
};
