const mongoose = require('mongoose');

const questionModel = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    required: true,
  },
  requirement: {
    type: Boolean,
    default: false,
  },
  sequence: {
    type: Number,
    required: true,
  },
  options: {
    type: [String],
    default: null,
  },
});

const QuestionModel = mongoose.model('QuestionModel', questionModel);

module.exports = QuestionModel;
