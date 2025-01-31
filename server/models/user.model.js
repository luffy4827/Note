const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },

  // Array of references to Note documents
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "note", // The model name you're referencing
    },
  ],
});

module.exports = mongoose.model("user", userSchema);
