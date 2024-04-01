import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const path = require('path');

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '20mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, parameterLimit: 20 }));
app.use(helmet())
app.use(hpp())
app.use(cors())

const init = () => {
  dotenv.config({
    path: `${__dirname}/../.${process.env.NODE_ENV}.env`,
  });

  app.listen(port, () => {
    console.info(`Express server starting at port ${port} in ${process.env.NODE_ENV}`)
  })
  return app;
}

init();

module.exports = app