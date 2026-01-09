const boardModel = require("../models/boardModel");
const cardModel = require("../models/cardModel");
const listModel = require("../models/listModel");

const dashboardOverviewController = async (req, res) => {
  try {
    const userId = req.user.id;

    const boards = await boardModel.find({ owner: userId });
    const boardIds = boards.map((b) => b._id);

    const listsCount = await listModel.countDocuments({
      boardId: { $in: boardIds },
    });
    const cardsCount = await cardModel.countDocuments({
      boardId: { $in: boardIds },
    });

    res.status(200).send({
      success: true,
      data: {
        totalBoards: boards.length > 0 ? boards.length : 0,
        totalLists: listsCount,
        totalCards: cardsCount,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erreur lors de la recuperation overview dashboard. API",
    });
  }
};

module.exports = { dashboardOverviewController };
