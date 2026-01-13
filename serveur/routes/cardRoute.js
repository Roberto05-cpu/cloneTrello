const express = require('express')
const { authMiddleware } = require('../middlewares/authmiddleware')
const { createCardController, getCardsByListController, updateCardController, deleteCardController, getCardByBoardController } = require('../controllers/cardController')

const router = express.Router()

// creer une carte
router.post('/create-card', authMiddleware, createCardController)

// recuperer toutes les cartes du board
router.get('/get-cards-by-board/:boardId', authMiddleware, getCardByBoardController)

// recuperer les cartes d'une liste
router.get('/get-cards/:listId', authMiddleware, getCardsByListController)

// modifier une carte
router.put('/update-card/:id', authMiddleware, updateCardController )

// supprimer une carte
router.delete('/delete-card/:id', authMiddleware, deleteCardController )

module.exports = router