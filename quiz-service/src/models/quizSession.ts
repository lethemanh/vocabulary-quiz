import mongoose, { Document, Schema } from 'mongoose';

interface IQuizSession extends Document {
  questions: string[];
  createdAt?: Date;
}

const quizSessionSchema = new Schema<IQuizSession>({
  questions: [String],
  createdAt: { type: Date, default: Date.now },
});

export const QuizSession = mongoose.model<IQuizSession>('QuizSession', quizSessionSchema);
