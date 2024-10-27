import mongoose, { Document, Schema } from 'mongoose';

interface IQuestion extends Document {
  text: string;
  options: string[];
  correctAnswer: string;
}

const questionSchema = new Schema<IQuestion>({
  text: { type: String, required: true },
  options: [String],
  correctAnswer: { type: String, required: true },
});

export const Question = mongoose.model('Question', questionSchema);
