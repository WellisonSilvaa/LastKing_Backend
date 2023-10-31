const express = require('express')
const router = express.Router()

// Importacao de Requests //
const usersControllers = require('./controllers/usersControllers')

router.get('/users', usersControllers.getAll)
router.post('/users', usersControllers.createUser)

module.exports = router;