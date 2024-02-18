const express = require("express");
const router = express.Router();
const controller = require("./controller");

// Product routes
router.get("/", controller.getAllQuestions);
router.post("/", controller.createQuestion);
router.get("/:id", controller.getQuestionById);
router.delete("/:id", controller.deleteQuestion);
router.put("/:id", controller.updateQuestion);

// Add more routes for create, update, and delete products

module.exports = router;