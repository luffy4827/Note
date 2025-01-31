const router = require("express").Router();
const {
  createNote,
  getAllNotes,
  deleteNotes,
  updateImportant,
  completed,
  getAllImpNotes,
  getAllInCompNotes,
  getAllCompNotes,
} = require("../controllers/noteController");
const isAuthenticated = require("../middleware/isAuthenticated");

// create-notes
router.post("/create-note", isAuthenticated, createNote);
router.get("/get-all-notes", isAuthenticated, getAllNotes);
router.delete("/delete-note/:id", isAuthenticated, deleteNotes);
router.put("/update-imp-note/:id", isAuthenticated, updateImportant);
router.put("/update-comp-note/:id", isAuthenticated, completed);
router.get("/all-important-note/", isAuthenticated, getAllImpNotes);
router.get("/all-completed-note/", isAuthenticated, getAllCompNotes);
router.get("/all-incomp-note/", isAuthenticated, getAllInCompNotes);

module.exports = router;
