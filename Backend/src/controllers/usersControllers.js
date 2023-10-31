const usersModel = require('../models/usersModel')
const bcrypt = require('bcrypt');

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
    var dados = req.body
    console.log('Senha = ', req.body)
    // Criando a senha criptografada //
    dados.password = await bcrypt.hash(dados.password, 8)

    await usersModel.Usuario.create(req.body)
        .then(() => {
            return res.status(200).json({
                erro: false,
                mensagem: 'Usuário criado com sucesso'
            })
        }).catch(() => {
            return res.status(400).json({
                erro: true,
                mensagem: 'Erro: Usuário não cadastrado'
            })
        })
}

// Método de Login //

const signin = async (req, res) => {
    const user = await usersModel.Usuario.findOne({
        where: {
            email: req.body.email
        }
    })

    if(user) {
        bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
            if( err || !isMatch) {
                return res.status(401).json({
                    erro: true,
                    mensagem: 'Senha incorreta'
                })

            }
            const payload = { id: user.id }
            res.json({
                name: user.name,
                email: user.email,
                token: jwt.encode(payload, authSecret)
            })
       }) 
    } else {
        return res.status(400).json({
            erro: true,
            mensagem: 'Usuário não encontrado'
        })
    }
}



module.exports = {
    getAll,
    createUser
}