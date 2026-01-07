const express = require('express')
const { authMiddleware } = require('../middlewares/authmiddleware')
const { createBoardController, getUserBoardController, getBoardByIdController, updateBoardByIdController, deleteBoardByIdController } = require('../controllers/boardController')

const router = express.Router()

// creer un tableau
router.post('/create-board', authMiddleware, createBoardController)

// recuperer les tableaux de l'utilisateur connecté
router.get('/get-user-board', authMiddleware, getUserBoardController)

// recuperer un board par son id
router.get('/get-board/:id', authMiddleware, getBoardByIdController)

// modifier un board par son id
router.put('/update-board/:id', authMiddleware, updateBoardByIdController)

// supprimer un board par son id
router.delete('/delete-board/:id', authMiddleware, deleteBoardByIdController)

module.exports = router