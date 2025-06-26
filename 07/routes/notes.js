const express = require("express");
const router = express.Router();
// controller/notes.js에 입력한 컨트롤러 Import
const noteController = require("../controllers/notes");

// 컨트롤러별 라우트
// 이미 notes로 요청이 들어오기 때문에 notes는 삭제
router.post("/", noteController.createNote);
router.get("/", noteController.getAllNotes);
router.get("/:tag", noteController.getNotes);
router.put("/:id", noteController.updateNote);
router.delete("/:id", noteController.deleteNote);

module.exports = router;
