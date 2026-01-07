const express = require('express')
const { authMiddleware } = require('../middlewares/authmiddleware')
const { createListController, getListsByBoardController, updateListController, deleteListController } = require('../controllers/listController')

const router = express.Router()

// creer une liste
router.post('/create-list', authMiddleware,  createListController)

// recuperer les listes d'un board
router.get('/get-lists/:boardId', authMiddleware, getListsByBoardController)

// modifier une list
router.put('/update-list/:id', authMiddleware, updateListController )

// supprimer une list
router.delete('/delete-list/:id', authMiddleware, deleteListController )

module.exports = router