const usersModel = require('../models/usersModel')

// Metodo para Listar Usuarios cadastrados //
const getAll = async (_req, res) => {
    await usersModel.Usuario.findAll({
        attributes: ['id', 'name', 'email', 'password']
    }).then((users) => {
        return res.status(200).json({
            erro: false,
            users
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Nenhum usuário encontrado"
        })
    })
}

// Metodo de criacao de Usuario //

const createUser = async (req, res) => {
    console.log('Minha REQ',req)
}



module.exports = {
    getAll,
    createUser
}