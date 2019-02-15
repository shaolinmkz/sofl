import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { userRoute } from './routes';
dotenv.config();

const app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(userRoute);

app.get('*', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the training'
  })
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
