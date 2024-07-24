const { version } = require('../../package.json');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
  path: path.resolve(process.cwd(), `config.${process.env.NODE_ENV}.env`),
});
const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Monifiex API documentation',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/Digitech-Egitim-Teknolojileri-A-S/monifiex-backend/blob/master/LICENSE',
    },
  },
  servers: [
    {
      url: `${process.env.DOMAIN}/v1`,
    },
  ],
};

module.exports = swaggerDef;
