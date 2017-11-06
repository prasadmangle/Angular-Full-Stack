import * as mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  name: String,
  topic: String
});

const Exam = mongoose.model('Exam', examSchema);

export default Exam;
