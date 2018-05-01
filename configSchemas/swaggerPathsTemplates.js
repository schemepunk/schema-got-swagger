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
    title: {
      type: 'string',
      description: 'A template for the title partial.',
    },
    destinationTenplate: {
      type: 'string',
      description: 'The destination Template rendered with any partials',
    },
  },
};
