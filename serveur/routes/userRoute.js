const express = require('express')
const { createUserController, loginUserController, getProfileUserController } = require('../controllers/userController')
const { authMiddleware } = require('../middlewares/authmiddleware')

const router = express.Router()

// creer un utilisateur
router.post('/create-user', createUserController)

// login utilisateur
router.post('/login', loginUserController)

// recuperer le profil
router.get('/get-user-info', authMiddleware, getProfileUserController)

module.exports = router