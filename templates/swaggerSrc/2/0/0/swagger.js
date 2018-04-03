// Object with data for templates
module.exports = {
  title: '{{apiName}}',
  description: '{{apiDescription}}',
  version: '{{apiVersion}}',
  termsOfService: '{{termsOfService}}',
  contact: "{{=<% %>=}}{ name: '<%contact.name%>', url: '<%contact.url%>', email: '<%contact.email%>' }<%={{ }}=%>", // eslint-disable-line max-len
  license: "{{=<% %>=}}{ name: '<%license.name%>', url: '<%license.url%>'<%={{ }}=%>",
  host: '{{apiHost}}',
  basePath: '{{apiBasePath}}',
  schemes: "['{{schemes.scheme.name}}'{{#schemes.scheme.comma}}, {{/schemes.scheme.comma}}]", // eslint-disable-line max-len
  produces: "['{{produces.mime.type}}'{{^produces.mime.comma}}, {{/produces.mime.comma}}]", // eslint-disable-line max-len
  definitions: '{{#definitions}}{{definition.name}}: {{definition.body}}{{#definition.comma}},{{/definition.comma}}{{/definitions}}', // eslint-disable-line max-len
  parameters: '{{=<% %>=}}{<%={{ }}=%>{{#parameters}}{{parameter.name}}: {{=<% %>=}}{<%={{ }}=%>{{parameter.body}}{{=<% %>=}}}<%={{ }}=%>{{#parameter.comma}},{{/parameter.comma}}{{/parameters}}{{=<% %>=}}{<%={{ }}=%>', // eslint-disable-line max-len
  responses: '{{#responses}}{{=<% %>=}}{<%={{ }}=%> {{response.name}}: {{=<% %>=}}{<%={{ }}=%> description:{{response.description}}, {{#response.schema}}schema: {{response.schema}}, {{/response.schema}}{{#response.headers}}headers: {{response.headers}}, {{/response.headers}}{{#response.examples}}examples: {{response.examples}}{{/response.examples}}{{=<% %>=}}}<%={{ }}=%>{{=<% %>=}}}<%={{ }}=%>{{/responses}}', // eslint-disable-line max-len
  securityDefinitions: '{{#securityDefinitions}}{{#securityDefinition}}{{=<% %>=}}{<%={{ }}=%>{{securityDefinition.name}}: {{=<% %>=}}{<%={{ }}=%> type: "{{type}}", description: "{{description}}", name: "{{name}}", in: "{{in}}", flow: "{{flow}}", authorizationUrl: "{{authorizationUrl}}", tokenUrl: "{{tokenUrl}}", scopes: {{=<% %>=}}{<%={{ }}=%>{{#scopes}}{{name}}: "{{description}}" {{comma}},{{/comma}}{{/scopes}}{{=<% %>=}}}<%={{ }}=%>{{/securityDefinition}}{{=<% %>=}}}<%={{ }}=%>{{/securityDefinitions}}{{=<% %>=}}}<%={{ }}=%>', // eslint-disable-line max-len
  security: '{{#security}}{{=<% %>=}}{<%={{ }}=%>{{securityName}}:[{{#items}}"{{#items.name}}"{{items.comma}},{{items.comma}}{{/items}}]{{=<% %>=}}}<%={{ }}=%>{{/security}}', // eslint-disable-line max-len
  tags: '{{#tags}}{{#tag}}{{=<% %>=}}{<%={{ }}=%>name: "{{tag.name}}" {{#tag.description}}, description: "{{tag.description}}"{{/tag.description}}{{#tag.externalDocs}}, externalDocs: {{=<% %>=}}{<%={{ }}=%>{{#tag.externalDocs.description}}description: "{{tag.externalDocs.description}}", {{/tag.externalDocs.description}}url: "{{tag.externalDocs.url}}"{{=<% %>=}}}<%={{ }}=%>{{/tag.externalDocs}}{{#tag.comma}}, {{/tag.comma}}{{=<% %>=}}}<%={{ }}=%>{{/tag}}{{/tags}}', // eslint-disable-line max-len
  externalDocs: '{{#externalDocs}}, externalDocs: {{=<% %>=}}{<%={{ }}=%>{{#description}}description: "{{description}}", {{/description}}url: "{{url}}"{{=<% %>=}}}<%={{ }}=%>{{/externalDocs}}', // eslint-disable-line max-len
  destinationTemplate: "{{=<% %>=}}{<%={{ }}=%>swagger: '2.0', info: {{=<% %>=}}{<%={{ }}=%> title: '{{> title}}', {{#description}}description: '{{> description}}',{{/description}} {{#termsOfService}}termsOfService: '{{> termsOfService}}',{{/termsOfService}} version: '{{> version}}', {{#contact}}contact: {{> contact}}{{/contact}} {{#license}}license: {{> license}}{{/license}}{{=<% %>=}}}<%={{ }}=%>, {{#host}}host: '{{> host}}',{{/host}} {{#basePath}}basePath: '{{> basePath}}',{{/basePath}} {{#schemes}}schemes: {{> schemes}}, {{/schemes}} {{#produces}}produces: {{> produces}}, {{/produces}} paths: {}, {{#definitions}}definitions: {{> definitions}},{{/definitions}} {{#parameters}}parameters: {{> parameters }},{{/parameters}} {{#responses}}responses: {{> responses }},{{/responses}} {{#securityDefinitions}}securityDefinitions: {{> securityDefinitions}},{{/securityDefinitions}} {{#security}}security: {{> security}},{{/security}} {{#tags}}tags: {{> tags}},{{/tags}} {{#externalDocs}}{{> externalDocs}}{{/externalDocs}} {{=<% %>=}}}<%={{ }}=%>", // eslint-disable-line max-len
};
