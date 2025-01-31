const NoteModel = require("../models/note.model");
const UserModel = require("../models/user.model");

// create notes controller
const createNote = async (req, res) => {
  try {
    let { title, description } = req.body;
    let { _id } = req.headers;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description is required" });
    }

    const createdNote = await NoteModel.create({
      title,
      description,
      user: _id,
    });

    const noteId = createdNote._id;
    const user = await UserModel.findByIdAndUpdate(_id, {
      $push: { notes: noteId },
    });
    return res.status(200).json({ message: "Note created successfully" });
  } catch (error) {
    console.error("Error creating note:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllNotes = async (req, res) => {
  try {
    let { _id } = req.headers;
    // const user = await UserModel.findById(_id).populate("notes"); this wil keep the oldest note in the first
    // we need to sort the recently made in the first place
    const user = await UserModel.findById(_id).populate({
      path: "notes",
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error fetching note:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteNotes = async (req, res) => {
  try {
    let { id } = req.params; //this is id of note not user
    let { _id } = req.headers; //this is id of user
    const deleteNote = await NoteModel.findByIdAndDelete(id);
    const removeFromUser = await UserModel.findByIdAndUpdate(_id, {
      $pull: { notes: id },
    });
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateNotes = async (req, res) => {
  try {
    let { id } = req.params; //this is id of note not user
    let { title, description } = req.body;
    const updateNote = await NoteModel.findByIdAndUpdate(id, {
      title: title,
      description: description,
    });
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateImportant = async (req, res) => {
  try {
    let { id } = req.params; //this is id of note not user
    const noteDate = await NoteModel.findById(id);
    const impNote = noteDate.important;
    const updateImpNote = await NoteModel.findByIdAndUpdate(id, {
      important: !impNote,
    });
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const completed = async (req, res) => {
  try {
    let { id } = req.params; //this is id of note not user
    const noteDate = await NoteModel.findById(id);
    const completedNote = noteDate.completed;
    const updateCompletedNote = await NoteModel.findByIdAndUpdate(id, {
      completed: !completedNote,
    });
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllImpNotes = async (req, res) => {
  try {
    let { _id } = req.headers;
    const user = await UserModel.findById(_id).populate({
      path: "notes",
      match: { important: true },
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error fetching Important note:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllCompNotes = async (req, res) => {
  try {
    let { _id } = req.headers;
    const user = await UserModel.findById(_id).populate({
      path: "notes",
      match: { completed: true },
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error fetching completed note:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllInCompNotes = async (req, res) => {
  try {
    let { _id } = req.headers;
    const user = await UserModel.findById(_id).populate({
      path: "notes",
      match: { completed: false },
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ data: user });
  } catch (error) {
    console.error("Error fetching incomplete note:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  deleteNotes,
  updateImportant,
  completed,
  getAllImpNotes,
  getAllInCompNotes,
  getAllCompNotes,
};
