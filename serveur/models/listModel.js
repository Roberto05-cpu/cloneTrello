const mongoose = require('mongoose')

const listSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },

    order: {
      type: Number,
      required: true,
      default: 0, // valeur par défaut si pas précisé
    },
  },
  {
    timestamps: true,
  }
);

const listModel = mongoose.model('list', listSchema)

module.exports = listModel