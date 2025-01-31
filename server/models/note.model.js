const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      // unique: true,
    },
    description: {
      type: String,
      // required: true,
    },
    important: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    // incomplete: {
    //   type: Boolean,
    //   default: false,
    // },
    // Reference to the User model
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // The model name you're referencing
    },
  },
  {
    timestamps: true, // Added timestamps in the correct location
  }
);

module.exports = mongoose.model("note", noteSchema);
