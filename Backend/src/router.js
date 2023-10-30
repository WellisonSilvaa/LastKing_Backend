const express = require('express')
const router = express.Router()

// Importacao de Requests //
const usersControllers = require('./controllers/usersControllers')

router.get('/users', usersControllers.getAll)

module.exports = router;