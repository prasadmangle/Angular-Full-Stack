import * as mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: String,
  correctAnswer: String
});

const examSchema = new mongoose.Schema({
  name: String,
  topic: String,
  questions : [questionSchema]
});

const Exam = mongoose.model('Exam', examSchema);

export default Exam;
