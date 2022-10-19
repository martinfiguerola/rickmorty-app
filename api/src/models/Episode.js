const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  return sequelize.define('episode', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  })
}