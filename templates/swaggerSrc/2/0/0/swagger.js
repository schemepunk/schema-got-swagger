// Object with data for templates
module.exports = {
  title: '{{apiName}}',
  description: '{{apiDescription}}',
  version: '{{#apiVersion}}{{apiVersion}}{{/apiVersion}}{{^apiVersion}}{{apiSemver}}{{/apiVersion}}',
  termsOfService: '{{termsOfService}}',
  contact: '{{=<% %>=}}{<%={{ }}=%> "name": "{{contact.name}}", "url": "{{&contact.url}}", "email": "{{contact.email}}" {{=<% %>=}}}<%={{ }}=%>', // eslint-disable-line max-len
  license: '{{=<% %>=}}{ "name": "<%license.name%>", "url": "<%&license.url%>"}<%={{ }}=%>',
  host: '{{apiHost}}',
  basePath: '{{apiBasePath}}',
  schemes: '{{#schemes}}{{&process}}{{/schemes}}',
  consumes: '[{{#consumes}}"{{mime.type}}"{{#mime.comma}}, {{/mime.comma}}{{/consumes}}]',
  produces: '[{{#produces}}"{{mime.type}}"{{#mime.comma}}, {{/mime.comma}}{{/produces}}]',
  definitions: '{{#definitions}}{{&process}}{{/definitions}}',
  parameters: '{{#parameters}}{{&process}}{{/parameters}}',
  responses: '{{#responses}}{{&process}}{{/responses}}',
  securityDefinitions: '{{#securityDefinitions}}{{&process}}{{/securityDefinitions}}',
  security: '{{#security}}{{&process}}{{/security}}',
  tags: '{{#tags}}{{&process}}{{/tags}}',
  externalDocs: '{{#externalDocs}}{{=<% %>=}}{<%={{ }}=%>{{#description}}"description": "{{description}}", {{/description}}"url": "{{&url}}"{{=<% %>=}}}<%={{ }}=%>{{/externalDocs}}', // eslint-disable-line max-len
  destinationTemplate: '{{=<% %>=}}{<%={{ }}=%>"swagger": "2.0", "info": {{=<% %>=}}{<%={{ }}=%> "title": "{{> title}}", {{#description}}"description": "{{> description}}",{{/description}} {{#termsOfService}}termsOfService: "{{> termsOfService}}",{{/termsOfService}} "version": "{{> version}}", {{#contact}}"contact": {{> contact}},{{/contact}} {{#license}}"license": {{> license}}{{/license}}{{=<% %>=}}}<%={{ }}=%>, {{#host}}"host": "{{> host}}",{{/host}} {{#basePath}}"basePath": "{{> basePath}}",{{/basePath}} {{#schemes}}"schemes": {{> schemes}}, {{/schemes}} {{#consumes}}"consumes": {{> consumes}}, {{/consumes}} {{#produces}}"produces": {{> produces}}, {{/produces}} "paths": {}, {{#definitions}}"definitions": {{> definitions}},{{/definitions}} {{#parameters}}"parameters": {{> parameters }},{{/parameters}} {{#responses}}"responses": {{> responses }},{{/responses}} {{#securityDefinitions}}"securityDefinitions": {{> securityDefinitions}},{{/securityDefinitions}} {{#security}}"security": {{> security}},{{/security}} {{#tags}}"tags": {{> tags}},{{/tags}} {{#externalDocs}}"externalDocs": {{> externalDocs}}{{/externalDocs}} {{=<% %>=}}}<%={{ }}=%>', // eslint-disable-line max-len
};
