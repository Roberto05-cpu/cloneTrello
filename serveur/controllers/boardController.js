const boardModel = require("../models/boardModel");
const listModel = require("../models/listModel");

// creer un board
const createBoardController = async (req,res) => {
    try {
        // entree et validation du titre du board
        const { title } = req.body
        if (!title) {
            return res.status(400).send({
                success: false,
                message: "Le titre est requis"
            })
        }

        // créer le board lié à l'utilisateur connecté
        const board = await boardModel.create({
          title,
          owner: req.user.id, 
        });

        // reponse
        res.status(201).send({
          success: true,
          message: `Board de Mr ${req.user.name} créé avec succès`,
          board,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Erreur lors de la creation du board de l'utilisateur. API"
        })
    }
}

// recuperer les boards de l'utilisateur connecté
const getUserBoardController = async (req,res) => {
    try {
        // recuperer les boards de l'utilisateur connecté
        const boards = await boardModel.find({ owner: req.user.id }).sort({ createdAt: -1 });

        // reponse 
        res.status(200).send({
          success: true,
          message: `Boards de Mr ${req.user.name} récupérés avec succès`,
          boards,
       });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Erreur lors de la recuperation des board de l'utilisateur. API"
        })
    }
}

// recuperer un board par son id
const getBoardByIdController = async (req,res) => {
    try {
        const boardId = req.params.id;

        // recuperer le board par son id
        const board = await boardModel.findById(boardId);

        //reponse
        res.status(200).send({
            success: true,
            message: "Board récupéré avec succès",
            board,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Erreur lors de la recuperation du board par l'id. API"
        })
    }
}

// modifier un board par son id
const updateBoardByIdController = async (req,res) => {
    try {
        const boardId = req.params.id;
        const { title } = req.body;

        // validation
        if (!title) {
          return res.status(400).send({
            success: false,
            message: "Le titre est requis pour la modification",
          });
        }

        // chercher le board
        const board = await boardModel.findById(boardId);

        if (!board) {
          return res.status(404).send({
            success: false,
            message: "Board non trouvé",
          });
        }

        // vérifier que l'utilisateur est bien le propriétaire
        if (board.owner.toString() !== req.user.id) {
          return res.status(403).send({
            success: false,
            message: "Action non autorisée",
          });
        }

        // mettre à jour le titre
        board.title = title;
        await board.save();

        // reponse 
        res.status(200).send({
          success: true,
          message: "Board modifié avec succès",
          board,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Erreur lors de la modification du board par l'id. API"
        })
    }
}

const deleteBoardByIdController = async (req,res) => {
    try {
        const boardId = req.params.id;

        // chercher le board
        const board = await boardModel.findById(boardId);

        if (!board) {
          return res.status(404).send({
            success: false,
            message: "Board non trouvé",
          });
        }

        // vérifier que l'utilisateur est bien le propriétaire
        if (board.owner.toString() !== req.user.id) {
          return res.status(403).send({
            success: false,
            message: "Action non autorisée",
          });
        }

        // supprimer les listes associées au board
        await listModel.deleteMany({ boardId: board._id });

        // supprimer le board
        await board.deleteOne();

        // reponse
        res.status(200).send({
          success: true,
          message: "Board supprimé avec succès",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Erreur lors de la suppression du board par l'id. API"
        })
    }
}

module.exports = {createBoardController, getUserBoardController, getBoardByIdController, updateBoardByIdController, deleteBoardByIdController}