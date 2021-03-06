import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models';
import {
  Helpers
} from '../Helpers';

dotenv.config();

/**
 * @description User controller methods
 * @return {undefined}
 */
export default class UserController {
  /**
   * @description controller function that handles the creation of a User
   *
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @return {undefined}
   */
  static createUser(req, res) {
    const {
      firstname,
      lastname,
      email,
      password,
    } = req.body;

    const hash = bcrypt.hashSync(password, 8);

    const requestBody = {
      firstname,
      lastname,
      email,
      password: hash
    };

    User.create(requestBody)
      .then((userData) => {
        const token = jwt.sign({
          id: userData.id,
          firstname,
          lastname,
          email
        }, process.env.SECRET_KEY);

        res.status(201).json({
          status: 'success',
          data: {
            id: userData.id,
            firstname,
            lastname,
            email
          },
          token,
          message: 'user created successfully'
        });
      })
      .catch(error => res.status(400).json({
        error
      }));
  }

  /**
   * @description controller function that handles user login
   *
   * @param {object} req - Express request object
   * @param {object} res - Express response object
   * @return {undefined}
   */
  static loginUser(req, res) {
    const {
      email,
      password,
    } = req.body;

    User.findOne({
      where: {
        email
      }
    }).then((userData) => {
      if (!userData) {
        Helpers.errorReturns(req, res, 400, 'Error', "user doesn't exists");
      } else {
        const hash = userData.password;
        const isPassword = bcrypt.compareSync(password, hash);
        const userInfo = {
          id: userData.id,
          firstname: userData.firstname,
          lastname: userData.lastname,
          email: userData.email
        };
        if (isPassword) {
          const token = jwt.sign({
            userInfo
          }, process.env.SECRET_KEY);

          res.status(200).json({
            status: 'success',
            token,
            message: 'user login successful'
          });
        } else {
          Helpers.errorReturns(req, res, 400, 'Error', 'invalid email or password');
        }
      }
    }).catch(error => res.status(400).json({
      error
    }));
  }
}
