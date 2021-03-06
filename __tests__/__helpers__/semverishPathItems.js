module.exports = {
  1: {
    0: {
      example: {
        definitions: {
          paths: [
            {
              pathItem: '/examples{id}',
              last: true,
              operations: [
                {
                  operationName: 'get',
                  comma: true,
                  description: 'Returns examples',
                  summary: 'Find examples',
                  operationId: 'getExamples',
                  produces: {
                    process: function () { return JSON.stringify(this.items) }, // eslint-disable-line
                    items: [
                      'application/json',
                      'text/html',
                    ],
                  },
                  responses: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: {
                      200: {
                        description: 'example response',
                        schema: {
                          type: 'array',
                          items: {
                            $ref: '#/definitions/Pet',
                          },
                        },
                      },
                      default: {
                        description: 'error payload',
                        schema: {
                          $ref: '#/definitions/ErrorModel',
                        },
                      },
                    },
                  },
                  parameters: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: {
                      idParam: {
                        name: 'id',
                        in: 'path',
                        description: 'ID of pet to use',
                        required: true,
                        type: 'array',
                        items: {
                          type: 'string',
                        },
                        collectionFormat: 'csv',
                      },
                    },
                  },
                },
                {
                  operationName: 'put',
                  tags: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: [
                      {
                        name: 'pet',
                      },
                    ],
                  },
                  summary: 'Updates a in the store with form data',
                  descriptions: 'Updates a pet',
                  operationId: 'updatePetWithForm',
                  consumes: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: [
                      'application/x-www-form-urlencoded',
                    ],
                  },
                  produces: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: [
                      'application/json',
                      'application/xml',
                    ],
                  },
                  parameters: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: {
                      petIdParam: {
                        name: 'petId',
                        in: 'path',
                        description: 'ID of pet that needs to be updated',
                        required: true,
                        type: 'string',
                      },
                      nameParam: {
                        name: 'name',
                        in: 'formData',
                        description: 'Updated name of the pet',
                        required: false,
                        type: 'string',
                      },
                      statusParam: {
                        name: 'status',
                        in: 'formData',
                        description: 'Updated status of the pet',
                        required: false,
                        type: 'string',
                      },
                    },
                  },
                  responses: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: {
                      200: {
                        description: 'Pet updated',
                      },
                      405: {
                        description: 'Invalid input',
                      },
                    },
                  },
                  security: {
                    process: function () { return JSON.stringify(this.items) }, // eslint-disable-line
                    items: {
                      petstore_auth: [
                        'write:pets',
                        'read:pets',
                      ],
                    },
                  },
                },
              ],
            },
          ],
        },
      },
      pet: {
        definitions: {
          paths: [
            {
              pathItem: '/pets',
              last: true,
              operations: [
                {
                  operationName: 'get',
                  comma: true,
                  description: 'Returns pets based on ID',
                  summary: 'Find pets by ID',
                  operationId: 'getPetsById',
                  produces: {
                    process: function () { return JSON.stringify(this.items) }, // eslint-disable-line
                    items: [
                      'application/json',
                      'text/html',
                    ],
                  },
                  responses: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: {
                      200: {
                        description: 'pet response',
                        schema: {
                          type: 'array',
                          items: {
                            $ref: '#/definitions/Pet',
                          },
                        },
                      },
                      default: {
                        description: 'error payload',
                        schema: {
                          $ref: '#/definitions/ErrorModel',
                        },
                      },
                    },
                  },
                  parameters: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: {
                      idParam: {
                        name: 'id',
                        in: 'path',
                        description: 'ID of pet to use',
                        required: true,
                        type: 'array',
                        items: {
                          type: 'string',
                        },
                        collectionFormat: 'csv',
                      },
                    },
                  },
                },
                {
                  operationName: 'put',
                  tags: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: [
                      {
                        name: 'pet',
                      },
                    ],
                  },
                  summary: 'Updates a pet in the store with form data',
                  descriptions: 'Updates a pet',
                  operationId: 'updatePetWithForm',
                  consumes: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: [
                      'application/x-www-form-urlencoded',
                    ],
                  },
                  produces: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: [
                      'application/json',
                      'application/xml',
                    ],
                  },
                  parameters: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: {
                      petIdParam: {
                        name: 'petId',
                        in: 'path',
                        description: 'ID of pet that needs to be updated',
                        required: true,
                        type: 'string',
                      },
                      nameParam: {
                        name: 'name',
                        in: 'formData',
                        description: 'Updated name of the pet',
                        required: false,
                        type: 'string',
                      },
                      statusParam: {
                        name: 'status',
                        in: 'formData',
                        description: 'Updated status of the pet',
                        required: false,
                        type: 'string',
                      },
                    },
                  },
                  responses: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: {
                      200: {
                        description: 'Pet updated',
                      },
                      405: {
                        description: 'Invalid input',
                      },
                    },
                  },
                  security: {
                    process: function () { return JSON.stringify(this.items) }, // eslint-disable-line
                    items: {
                      petstore_auth: [
                        'write:pets',
                        'read:pets',
                      ],
                    },
                  },
                },
              ],
            },
          ],
        },
      },
    },
    1: {
      0: {
        pet: {
          definitions: {
            paths: [{
              pathItem: '/pets',
              last: true,
              operations: [
                {
                  operationName: 'get',
                  comma: true,
                  description: 'Returns pets based on ID',
                  summary: 'Find pets by ID',
                  operationId: 'getPetsById',
                  produces: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: [
                      'application/json',
                      'text/html',
                    ],
                  },
                  responses: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: {
                      200: {
                        description: 'pet response',
                        schema: {
                          type: 'array',
                          items: {
                            $ref: '#/definitions/Pet',
                          },
                        },
                      },
                      default: {
                        description: 'error payload',
                        schema: {
                          $ref: '#/definitions/ErrorModel',
                        },
                      },
                    },
                  },
                  parameters: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: {
                      id: {
                        name: 'id',
                        in: 'path',
                        description: 'ID of pet to use',
                        required: true,
                        type: 'array',
                        items: {
                          type: 'string',
                        },
                        collectionFormat: 'csv',
                      },
                    },
                  },
                },
                {
                  operationName: 'put',
                  tags: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: [
                      {
                        name: 'pet',
                      },
                    ],
                  },
                  summary: 'Updates a pet in the store with form data',
                  descriptions: 'Updates a pet',
                  operationId: 'updatePetWithForm',
                  consumes: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: [
                      'application/x-www-form-urlencoded',
                    ],
                  },
                  produces: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: [
                      'application/json',
                      'application/xml',
                    ],
                  },
                  parameters: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: {
                      petIdParam: {
                        name: 'petId',
                        in: 'path',
                        description: 'ID of pet that needs to be updated',
                        required: true,
                        type: 'string',
                      },
                      nameParam: {
                        name: 'name',
                        in: 'formData',
                        description: 'Updated name of the pet',
                        required: false,
                        type: 'string',
                      },
                      statusParam: {
                        name: 'status',
                        in: 'formData',
                        description: 'Updated status of the pet',
                        required: false,
                        type: 'string',
                      },
                    },
                  },
                  responses: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: {
                      200: {
                        description: 'Pet updated',
                      },
                      405: {
                        description: 'Invalid input',
                      },
                    },
                  },
                  security: {
                    process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                    items: {
                      petstore_auth: [
                        'write:pets',
                        'read:pets',
                      ],
                    },
                  },
                },
              ],
            },
            ],
          },
        },
      },
      1: {
        pet: {
          definitions: {
            paths: [
              {
                pathItem: '/pets',
                last: true,
                operations: [
                  {
                    operationName: 'get',
                    comma: true,
                    description: 'Returns pets based on ID',
                    summary: 'Find pets by ID',
                    operationId: 'getPetsById',
                    produces: {
                      process: function () { return JSON.stringify(this.items) }, // eslint-disable-line
                      items: [
                        'application/json',
                        'text/html',
                      ],
                    },
                    responses: {
                      process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                      items: {
                        200: {
                          description: 'pet response',
                          schema: {
                            type: 'array',
                            items: {
                              $ref: '#/definitions/Pet',
                            },
                          },
                        },
                        default: {
                          description: 'error payload',
                          schema: {
                            $ref: '#/definitions/ErrorModel',
                          },
                        },
                      },
                    },
                    parameters: {
                      process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                      items: {
                        id: {
                          name: 'id',
                          in: 'path',
                          description: 'ID of pet to use',
                          required: true,
                          type: 'array',
                          items: {
                            type: 'string',
                          },
                          collectionFormat: 'csv',
                        },
                      },
                    },
                  },
                  {
                    operationName: 'put',
                    tags: {
                      process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                      items: [
                        {
                          name: 'pet',
                        },
                      ],
                    },
                    summary: 'Updates a pet in the store with form data',
                    descriptions: 'Updates a pet',
                    operationId: 'updatePetWithForm',
                    consumes: {
                      process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                      items: [
                        'application/x-www-form-urlencoded',
                      ],
                    },
                    produces: {
                      process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                      items: [
                        'application/json',
                        'application/xml',
                      ],
                    },
                    parameters: {
                      process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                      items: {
                        petIdParam: {
                          name: 'petId',
                          in: 'path',
                          description: 'ID of pet that needs to be updated',
                          required: true,
                          type: 'string',
                        },
                        nameParam: {
                          name: 'name',
                          in: 'formData',
                          description: 'Updated name of the pet',
                          required: false,
                          type: 'string',
                        },
                        statusParam: {
                          name: 'status',
                          in: 'formData',
                          description: 'Updated status of the pet',
                          required: false,
                          type: 'string',
                        },
                      },
                    },
                    responses: {
                      process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                      items: {
                        200: {
                          description: 'Pet updated',
                        },
                        405: {
                          description: 'Invalid input',
                        },
                      },
                    },
                    security: {
                      process: function () { return JSON.stringify(this.items)}, // eslint-disable-line
                      items: {
                        petstore_auth: [
                          'write:pets',
                          'read:pets',
                        ],
                      },
                    },
                  },
                ],
              },
            ],
          },
        },
      },
    },
  },
};
