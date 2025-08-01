import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';

dotenv.config();

const port = process.env.PORT || 6000;

const app = express();

app.listen(port, () => {
  console.log("Hello from server");
  connectDb();
});
