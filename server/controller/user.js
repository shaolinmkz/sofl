import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { User } from '../models';
// const User = require('../models').User;

/**
 * @description Class CRUD
 * @return {undefined}
 */
export default class UserController {
  /**
   * @description controller function that handles the creation of a User
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
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
    const token = jwt.sign({
      firstname,
      lastname,
      email
    }, process.env.SECRET_KEY);

    User.create(requestBody)
      .then(data => {
        res.status(201).json({
          status: 201,
          data,
          token,
          message: 'User created successfully'
        });
      })
      .catch(error => res.status(400).json({
        error
      }));
  }

}
