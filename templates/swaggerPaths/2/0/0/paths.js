// Object with data for templates
module.exports = {
  definitions: '{{#definitions}}{{&process}}{{/definitions}}{{^definitions}}{{=<% %>=}}{}<%={{ }}=%>{{/definitions}}', // eslint-disable-line max-len
  parameters: '"parameters":{{#parameters}} {{&process}},{{/parameters}}{{^parameters}}[],{{/parameters}}', // eslint-disable-line max-len
  tags: '"tags": {{#tags}}{{&process}},{{/tags}} {{^tags}}[],{{/tags}}', // eslint-disable-line max-len
  externalDocs: '"externalDocs": {{#externalDocs}}{{=<% %>=}}{<%={{ }}=%>{{#description}}"description": "{{description}}", {{/description}}"url": "{{&url}}"{{=<% %>=}}},<%={{ }}=%>{{/externalDocs}}{{^externalDocs}}{{=<% %>=}}{}<%={{ }}=%>,{{/externalDocs}}', // eslint-disable-line max-len
  consumes: '"consumes": {{#consumes}}{{&process}}, {{/consumes}}{{^consumes}}[], {{/consumes}}', // eslint-disable-line max-len
  produces: '"produces": {{#produces}}{{&process}}, {{/produces}}{{^produces}}[], {{/produces}}', // eslint-disable-line max-len
  security: '"security": {{#security}}{{&process}},{{/security}}{{^security}}{{=<% %>=}}{}<%={{ }}=%>,{{/security}}', // eslint-disable-line max-len
  responses: '{{#responses}}{{&process}}{{/responses}}', // eslint-disable-line max-len
  operations: '{{#operations}}"{{operationName}}": {{=<% %>=}}{<%={{ }}=%> {{> tags}} {{#summary}}"summary": "{{summary}}",{{/summary}} {{#description}}"description": "{{description}}",{{/description}} {{> externalDocs}} {{#operationId}}"operationId": "{{operationId}}", {{/operationId}} {{#deprecated}}"deprecated": {{deprecated}}, {{/deprecated}} {{> consumes}} {{> produces}} {{> parameters}} {{#schemes}}"schemes": {{schemes}},{{/schemes}} {{> security}} "responses": {{> responses}}{{=<% %>=}}}<%={{ }}=%>{{#comma}},{{/comma}}{{/operations}}', // eslint-disable-line max-len
  paths: '{{#paths}}"{{&pathItem}}": {{=<% %>=}}{<%={{ }}=%> {{#$ref}}"$ref": "{{$ref}}",{{/$ref}}  {{> parameters}}{{> operations}}{{=<% %>=}}}<%={{ }}=%>{{^last}},{{/last}}{{/paths}}', // eslint-disable-line max-len
  destinationTemplate: '{{=<% %>=}}{<%={{ }}=%>"paths":{{=<% %>=}}{<%={{ }}=%> {{> paths}}{{=<% %>=}}},<%={{ }}=%> "definitions": {{> definitions}}  {{=<% %>=}}}<%={{ }}=%>', // eslint-disable-line max-len
};
