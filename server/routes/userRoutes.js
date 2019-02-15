import express from 'express';
import { UserController } from '../controller';


const userRoute = express.Router();

userRoute.post('/v1/api/user', UserController.createUser);

export default userRoute;
