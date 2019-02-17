import express from 'express';
import { UserController } from '../controller';
import { UserValidation } from '../middlewares';


const userRoute = express.Router();

userRoute.post(
  '/api/v1/auth/signup',
  UserValidation.stringValidation,
  UserValidation.passwordValidation,
  UserValidation.userExist,
  UserController.createUser
);

userRoute.post(
  '/api/v1/auth/login',
  UserValidation.stringValidation,
  UserController.loginUser
);

export default userRoute;
