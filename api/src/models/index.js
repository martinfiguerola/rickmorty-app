const { Sequelize } = require('sequelize')
const { dbName, dbPassword, dbPort, dbUser, dbhost } = require('../utils/config/index')

const characterFactory = require('./Character')
const episodeFactory = require('./Episode')

//coneccion con sequelize
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbhost,
  dialect: dbUser,/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  logging: false
});

//Se crea las tablas
const Character = characterFactory(sequelize)
const Episode = episodeFactory(sequelize)

//Relaciones
Character.belongsToMany(Episode, { through: 'characterEpisode' })
Episode.belongsToMany(Character, { through: 'characterEpisode' })





module.exports = {
  conn: sequelize,
  Character,
  Episode
}