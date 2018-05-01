module.exports = {
  title: 'Swagger Got Schema Swagger Main Template',
  description: 'A schema describing the shape of the template object for the main swagger file.',
  $id: 'http://example.com/schemas/swaggerMainTemplate.json',
  type: 'object',
  additionalProperties: true,
  required: [
    'title',
    'version',
    'destinationTemplate',
  ],
  properties: {
    title: {
      type: 'string',
      description: 'A template for the title partial.',
    },
    description: {
      type: 'string',
      description: 'A template for the description partial.',
    },
    version: {
      type: 'string',
      description: 'A template for the version partial.',
    },
    termsOfService: {
      type: 'string',
      description: 'A template for the terms of service partial.',
    },
    contact: {
      type: 'string',
      description: 'A template for the contact partial.',
    },
    license: {
      type: 'string',
      description: 'A template for the license partial.',
    },
    host: {
      type: 'string',
      description: 'A template for the host partial.',
    },
    basePath: {
      type: 'string',
      description: 'A template for the basePath partial.',
    },
    schemes: {
      type: 'string',
      description: 'A template for the schenmes partial.',
    },
    consumes: {
      type: 'string',
      description: 'A template for the consumes partial.',
    },
    produces: {
      type: 'string',
      description: 'A template for the produces partial.',
    },
    definitions: {
      type: 'string',
      description: 'A template for the definitions partial.',
    },
    parameters: {
      type: 'string',
      description: 'A template for the parameters partial.',
    },
    responses: {
      type: 'string',
      description: 'A template for the resonses partial.',
    },
    securityDefinitions: {
      type: 'string',
      description: 'A template for the securityDefinitions partial.',
    },
    security: {
      type: 'string',
      description: 'A template for the security partial.',
    },
    tags: {
      type: 'string',
      description: 'A template for the tags partial.',
    },
    externalDocs: {
      type: 'string',
      description: 'A template for the externalDocs partial.',
    },
    destinationTenplate: {
      type: 'string',
      description: 'The destination Template rendered with any partials',
    },
  },
};
