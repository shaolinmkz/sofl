/* eslint-disable class-methods-use-this */
/* eslint-disable valid-jsdoc */
/**
 * @description Helper class
 * @class Helpers
 */
class Helpers {
  /**
   * @description A return function for errors
   *
   * @param {object} req - request body
   * @param {object} res - response body
   * @param {number} statusCode - status code
   * @param {string} message - response message
   */
  static errorReturns(req, res, statusCode, status, message) {
    res.status(statusCode).json({
      status,
      message
    });
  }
}

export default Helpers;
