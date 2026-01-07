const express = require('express')
const { authMiddleware } = require('../middlewares/authmiddleware')
const { createCardController, getCardsByListController, updateCardController, deleteCardController } = require('../controllers/cardController')

const router = express.Router()

// creer une carte
router.post('/create-card', authMiddleware, createCardController)

// recuperer les cartes d'une liste
router.get('/get-cards/:listId', authMiddleware, getCardsByListController)

// modifier une carte
router.put('/update-card/:id', authMiddleware, updateCardController )

// supprimer une carte
router.delete('/delete-card/:id', authMiddleware, deleteCardController )

module.exports = router