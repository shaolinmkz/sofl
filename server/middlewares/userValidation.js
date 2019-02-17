/* eslint-disable no-restricted-syntax */
/* eslint-disable require-jsdoc */
import { Helpers } from '../Helpers';
import { User } from '../models';

class UserValidation {
  static passwordValidation(req, res, next) {
    const { password, confirmPassword } = req.body;
    if (password.toString().length < 6) {
      Helpers.errorReturns(req, res, 400, 'Error', 'password length must be greaterthan or equal to 6');
    } else if (password.toString().length > 30) {
      Helpers.errorReturns(req, res, 400, 'Error', 'password length must be lessthan or equal to 30');
    } else if (password !== confirmPassword) {
      Helpers.errorReturns(req, res, 400, 'Error', "password doesn't match");
    } else {
      next();
    }
  }

  static stringValidation(req, res, next) {
    for (const input in req.body) {
      if (!req.body[input]) {
        return Helpers.errorReturns(req, res, 400, 'Error', `${input} field is required`);
      }
    }

    for (const input in req.body) {
      if (typeof req.body[input] !== 'string') {
        return Helpers.errorReturns(req, res, 400, 'Error', `${input} field should be a string`);
      }
    }
    next();
  }

  // eslint-disable-next-line require-jsdoc
  static userExist(req, res, next) {
    const { email } = req.body;
    User.findOne({ where: { email } }).then((userData) => {
      if (userData) {
        Helpers.errorReturns(req, res, 400, 'Error', 'user already exists');
      } else {
        next();
      }
    });
  }
}

export default UserValidation;
