const Sequelize = require('sequelize')
// importando dotenv para poder usar process.env e a config//
require('dotenv').config()

const connection = new Sequelize(
    process.env.MYSQL_DB, 
    process.env.MYSQL_USER, 
    process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
})

connection.authenticate()
    .then(function() {
        console.log('Conexão com banco de dados realizada com Sucesso')
    }).catch(function() {
        console.log('Erro: Conexão com banco de dados não realizada')
    })

    module.exports = connection;