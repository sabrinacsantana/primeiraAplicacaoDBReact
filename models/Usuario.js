const Sequelize = require('sequelize')
const db = require('../database/db')

module.exports = db.sequelize.define(
  'usuario',
  {
    id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome:{
      type: Sequelize.STRING
    },
    telefone:{
      type: Sequelize.INTEGER
    },
    email:{
      type: Sequelize.STRING
    },
    senha:{
      type: Sequelize.STRING
    }
  },
  {
    timestamps:false
  }
)