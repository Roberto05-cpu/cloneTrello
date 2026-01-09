const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "list",
      required: true,
    },

    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },

    order: {
      type: Number,
      required: true,
      default: 0, // position dans la list
    },
  },
  {
    timestamps: true,
  }
);

const cardModel = mongoose.model("card", cardSchema);

module.exports = cardModel;
