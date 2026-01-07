const boardModel = require("../models/boardModel");
const cardModel = require("../models/cardModel");
const listModel = require("../models/listModel");

// creer une carte
const createCardController = async (req, res) => {
  try {
    // entree et validation du titre, description et listId de la carte
    const { title, description, listId } = req.body;
    if (!title || !listId) {
      return res.status(400).send({
        success: false,
        message: "Le titre et l'identifiant de la liste sont requis",
      });
    }

    // vérifier que la list existe
    const list = await listModel.findById(listId);
    if (!list) {
      return res.status(404).send({
        success: false,
        message: "List non trouvée",
      });
    }

    // vérifier que l'utilisateur est propriétaire du board parent
    const board = await boardModel.findById(list.boardId);
    if (!board || board.owner.toString() !== req.user.id) {
      return res.status(403).send({
        success: false,
        message: "Action non autorisée",
      });
    }

    // calculer l'ordre de la nouvelle card
    const lastCard = await cardModel.findOne({ listId }).sort({ order: -1 });
    const newOrder = lastCard ? lastCard.order + 1 : 0; // première card = 0

    // créer la card
    const card = await cardModel.create({
      title,
      description,
      listId,
      order: newOrder,
    });

    res.status(201).send({
      success: true,
      message: "Card créée avec succès",
      card,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la creation d'une carte. API",
    });
  }
};

// recuperer les cartes d'une liste
const getCardsByListController = async (req, res) => {
  try {
    const { listId } = req.params;

    // vérifier que la liste existe
    const list = await listModel.findById(listId);
    if (!list) {
      return res.status(404).send({
        success: false,
        message: "List non trouvée",
      });
    }

    const board = await boardModel.findById(list.boardId);
    if (!board || board.owner.toString() !== req.user.id) {
      return res.status(403).send({
        success: false,
        message: "Action non autorisée",
      });
    }

    const cards = await cardModel.find({ listId }).sort({ order: 1 });

    // reponse
    res.status(200).send({
      success: true,
      message: "Cartes récupérées avec succès",
      cards,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la recuperation des cartes d'une liste. API",
    });
  }
};

const updateCardController = async (req, res) => {
  try {
    const cardId = req.params.id;
    const { title, description } = req.body;

    // chercher la card
    const card = await cardModel.findById(cardId);
    if (!card) {
      return res.status(404).send({
        success: false,
        message: "Card non trouvée",
      });
    }

    // vérifier que l'utilisateur est propriétaire du board parent
    const list = await listModel.findById(card.listId);
    if (!list) {
      return res.status(404).send({
        success: false,
        message: "List non trouvée",
      });
    }

    const board = await boardModel.findById(list.boardId);
    if (!board || board.owner.toString() !== req.user.id) {
      return res.status(403).send({
        success: false,
        message: "Action non autorisée",
      });
    }

    // modifier le titre et la description
    if (title) card.title = title;
    if (description) card.description = description;
    await card.save();

    res.status(200).send({
      success: true,
      message: "Card modifiée avec succès",
      card,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la modification d'une carte. API",
    });
  }
};

const deleteCardController = async (req, res) => {
  try {
    const cardId = req.params.id;

    // chercher la card
    const card = await cardModel.findById(cardId);
    if (!card) {
      return res.status(404).send({
        success: false,
        message: "Card non trouvée",
      });
    }

    // vérifier que l'utilisateur est propriétaire du board parent
    const list = await listModel.findById(card.listId);
    if (!list) {
      return res.status(404).send({
        success: false,
        message: "List non trouvée",
      });
    }

    const board = await boardModel.findById(list.boardId);
    if (!board || board.owner.toString() !== req.user.id) {
      return res.status(403).send({
        success: false,
        message: "Action non autorisée",
      });
    }

    const deletedOrder = card.order;

    // ✅ suppression correcte (pas remove)
    await card.deleteOne();

    // réorganiser les autres cards de la list
    await cardModel.updateMany(
      { listId: list._id, order: { $gt: deletedOrder } },
      { $inc: { order: -1 } }
    );

    // reponse
     res.status(200).send({
      success: true,
      message: "Card supprimée avec succès",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la suppression d'une carte. API",
    });
  }
};

module.exports = {
  createCardController,
  getCardsByListController,
  updateCardController,
  deleteCardController
};
