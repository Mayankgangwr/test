const Question = require("./model");

async function getAllQuestions(req, res) {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getQuestionById(req, res) {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createQuestion(req, res) {
  const { name, type, requirement, sequence, options } = req.body;

  const question = new Question({
    name,
    type,
    requirement,
    sequence,
    options,
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function updateQuestion(req, res) {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json(updatedQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function deleteQuestion(req, res) {
  try {
    const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }
    res.json({ message: "Question deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
};
