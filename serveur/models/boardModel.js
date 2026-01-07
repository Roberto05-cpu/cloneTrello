const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema(
    {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
)

const boardModel = mongoose.model('board', boardSchema)

module.exports = boardModel