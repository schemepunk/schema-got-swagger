module.exports = {
  title: 'Swagger Got Schema Swagger Paths Template',
  description: 'A schema describing the shape of the template object for swagger paths.',
  $id: 'http://example.com/schemas/swaggerPathsTemplate.json',
  type: 'object',
  additionalProperties: true,
  required: [
    'destinationTemplate',
  ],
  properties: {
    definitions: {
      type: 'string',
      description: 'A mustache partials template for definitions. To be used with a process function so that data structures can be passed through in their final format..', // eslint-disable-line max-len
    },
    parameters: {
      type: 'string',
      description: 'A mustache partial for parameters. Used for paths partials and individual operator parameters.', // eslint-disable-line max-len
    },
    tags: {
      type: 'string',
      description: 'A mustache partial for tags. To be used in conjunction with a process function.', // eslint-disable-line max-len
    },
    externalDocs: {
      type: 'string',
      description: 'A mustache partial for an operator externalDocs. To be used in conjunction with a process function.', // eslint-disable-line max-len
    },
    consumes: {
      type: 'string',
      description: 'A mustache partial for all operator consumes properties. To be used in conjunction with a process function.', // eslint-disable-line max-len
    },
    produces: {
      type: 'string',
      description: 'A mustache partial for all operator produces properties. To be used in conjunction with a process function.', // eslint-disable-line max-len
    },
    schemes: {
      type: 'string',
      description: 'A mustache partial for all operator schemes properties. To be used in conjunction with a process function.', // eslint-disable-line max-len
    },
    security: {
      type: 'string',
      description: 'A mustache partial for all operator security properties. To be used in conjunction with a process function.', // eslint-disable-line max-len
    },
    responses: {
      type: 'string',
      description: 'A mustache partial for responses. To be used in conjunction with a process function.', // eslint-disable-line max-len
    },
    operations: {
      type: 'string',
      description: 'A mustache partial for operations.', // eslint-disable-line max-len
    },
    paths: {
      type: 'string',
      description: 'A mustache partial for paths.', // eslint-disable-line max-len
    },
    destinationTenplate: {
      type: 'string',
      description: 'The destination Template rendered with any partials must include paths, but can include any other base swagger item that you want overwritten with these information produced by these partials.', // eslint-disable-line max-len
    },
  },
};
