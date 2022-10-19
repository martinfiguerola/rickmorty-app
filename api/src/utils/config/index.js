// vamos a interactuar con nuestro entorno:  npm i dotenv
require('dotenv').config()

module.exports = {
  PORT: process.env.PORT,
  dbUser: process.env.DB_USER,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbPassword: process.env.DB_PASSWORD,
  dbhost: process.env.HOST,
  BASE_URL: process.env.BASE_URL,
}