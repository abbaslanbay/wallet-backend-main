const express = require('express');
var morgan = require('./config/morgan');
const routes = require('./routes/v1');
const path = require('path');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const xss = require('xss-clean');
const compression = require('compression');
const ApiError = require('./utils/ApiError');
const { authLimiter } = require('./middlewares/rateLimiter');
const { errorConverter, errorHandler } = require('./middlewares/error');
const httpStatus = require('http-status');
const db = require('./models');
const i18n = require('./config/i18n.config');
dotenv.config({
  path: path.resolve(process.cwd(), `config.${process.env.NODE_ENV}.env`),
});

const app = express();

app.use(cookieParser());

//set Logger
if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

if (process.env.NODE_ENV === 'PRODUCTION') {
  app.use('/v1/auth', authLimiter);
}
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  })
);

app.use(i18n);

app.use('/v1', routes);
// db.sequelize.sync({ force: false }).then(() => {
//   console.log('Database connected');
// });

app.use(express.static(path.join(__dirname, 'public')));

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});
// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Example app listening on port ${process.env.SERVER_PORT}`);
});
