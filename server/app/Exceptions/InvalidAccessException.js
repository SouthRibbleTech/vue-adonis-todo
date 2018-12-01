'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InvalidAccessException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (err, { response }) {
    return response.status(403).json({
      error: 'invalid access to resource'
    })
  }
}

module.exports = InvalidAccessException
