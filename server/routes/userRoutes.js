import express from 'express';
import { UserController } from '../controller';
import { UserValidation } from '../middlewares';


const userRoute = express.Router();

userRoute.post(
  '/v1/api/signup',
  UserValidation.stringValidation,
  UserValidation.passwordValidation,
  UserValidation.userExist,
  UserController.createUser
  );

userRoute.post(
  '/v1/api/login',
  UserValidation.stringValidation,
  UserController.loginUser
  );

export default userRoute;
