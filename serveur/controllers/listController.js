const boardModel = require("../models/boardModel");
const cardModel = require("../models/cardModel");
const listModel = require("../models/listModel");

// creer une list
const createListController = async (req, res) => {
  try {
    const { title, boardId } = req.body;

    // validation
    if (!title || !boardId) {
      return res.status(400).send({
        success: false,
        message: "Le titre et le boardId sont requis",
      });
    }

    // Vérifier que le board existe et appartient à l'utilisateur
    const board = await boardModel.findById(boardId);
    if (!board) {
      return res.status(404).send({
        success: false,
        message: "Board non trouvé",
      });
    }

    if (board.owner.toString() !== req.user.id) {
      return res.status(403).send({
        success: false,
        message: "Action non autorisée",
      });
    }

    // Calculer le nouvel ordre
    const lastList = await listModel.findOne({ boardId }).sort({ order: -1 });
    const newOrder = lastList ? lastList.order + 1 : 0; // première list = 0

    // Créer la List
    const list = await listModel.create({
      title,
      boardId,
      order: newOrder,
    });

    // reponse
    res.status(201).send({
      success: true,
      message: "List créée avec succès",
      list,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la creation de la list. API",
    });
  }
};

// recuperer les listes d'un board
const getListsByBoardController = async (req, res) => {
  try {
    const { boardId } = req.params;

    // Vérifier que le board existe et appartient au user
    const board = await boardModel.findById(boardId);
    if (!board) {
      return res.status(404).send({
        success: false,
        message: "Board non trouvé",
      });
    }

    if (board.owner.toString() !== req.user.id) {
      return res.status(403).send({
        success: false,
        message: "Action non autorisée",
      });
    }

    const lists = await listModel.find({ boardId }).sort({ order: 1 });

    // reponse
    res.status(200).send({
      success: true,
      message: "Listes récupérées avec succès",
      lists,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la recuperation des list. API",
    });
  }
};

const updateListController = async (req, res) => {
  try {
    const listId = req.params.id;
    const { title } = req.body;

    if (!title) {
      return res.status(400).send({
        success: false,
        message: "Le titre est requis pour la modification",
      });
    }

    // chercher la list
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

    // modifier le titre
    list.title = title;
    await list.save();

    res.status(200).send({
      success: true,
      message: "List modifiée avec succès",
      list,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la modification d'une list. API",
    });
  }
};

const deleteListController = async (req, res) => {
  try {
    const listId = req.params.id;

    // chercher la list
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

    // supprimer les cartes associées
    await cardModel.deleteMany({ listId: list._id });

    const deletedOrder = list.order;

    // supprimer la list
    await list.deleteOne();

    // réorganiser les autres lists (ordre)
    await listModel.updateMany(
      { boardId: list.boardId, order: { $gt: deletedOrder } },
      { $inc: { order: -1 } }
    );

    res.status(200).send({
      success: true,
      message: "List supprimée avec succès",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la suppression d'une list. API",
    });
  }
};

module.exports = { createListController, getListsByBoardController, updateListController, deleteListController };
