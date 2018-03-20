// @flow

/**
 *   A custom error class which has a `code` property that
 *   should align with SchemaGotSwaggerError errors defined in ../_errors.js
 */
class SchemaGotSwaggerError extends Error {
  code: string
  /**
   * Creates an instance of SchemaGotSwaggerError.
   * @param {string} code
   *   A code string.
   * @param {any} args
   *   Additional args.
   * @memberof SchemaGotSwaggerError
   */
  constructor(code: string, ...args: any) {
    const [message, ...rest] = args;
    super(message || code, ...rest);

    Error.captureStackTrace(this, SchemaGotSwaggerError);

    this.code = code;
  }
}

/**
 *   A custom error class which has a `code` property that
 *   should align with morphologist errors defined in ../_errors.js
 */
class SchemaGotSwaggerReThrownError extends SchemaGotSwaggerError {
  original: Error
  new_stack: * // eslint-disable-line camelcase
  /**
   * Creates an instance of MorphologistError.
   * @param {string} code
   *   A code string.
   * @param {string} message
   *   An error message
   * @param {Error} error
   *   An Error.
   * @param {any} args
   *   Additional args.
   * @memberof MorphologistError
   */
  constructor(code: string, message: string, error: Error, ...args: any) {
    super(code, message, ...args);
    if (!error) throw new Error('A rethrown Schema Got Swagger error requires a message and error');
    this.original = error;
    this.new_stack = this.stack;
    const messageLines = (this.message.match(/\n/g) || []).length + 1;
    this.stack = `${this.stack.split('\n').slice(0, messageLines + 1).join('\n')} \n ${error.stack}`; // eslint-disable-line max-len
  }
}

module.exports = {
  SchemaGotSwaggerError,
  SchemaGotSwaggerReThrownError,
};
