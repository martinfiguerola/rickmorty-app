// Servidor : nodemon - morgan - express - sequelize - pg pg-hstore - dotenv
const express = require('express')
const morgan = require('morgan')
const v1Router = require('./src/v1/routes/index')
const setHeaders = require('./src/utils/middlewares/setHeaders')
const { PORT } = require('./src/utils/config/index')
const { conn } = require('./src/models/index')
// Inicializamos nuesta aplicacion de express
const app = express()
//Aca seteamos nuestros headers
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json())
app.use(morgan("dev"))
app.use(setHeaders)


//Aca seteamos nuestras rutas
app.use('/api/v1', v1Router)

// Aca nuestro middleware de control de errores
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.log(err)
  return res.status(status).send(message)
})

// Aca ponemos a escuchar nuestro servidor en el puerto correspondiente 
//y hacemos la coneccion de postgres

conn.sync({ force: false })
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(PORT, () => {
      console.log(` 🚀 Api is listening on port ${PORT}`)
    })
  })

