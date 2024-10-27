import mongoose, { Document, Schema } from 'mongoose';

interface IQuizSessionParticipant extends Document {
  userId: string;
  username: string;
  score: number;
  quizId: string;
}

const quizSessionParticipantSchema = new Schema<IQuizSessionParticipant>({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  score: { type: Number, default: 0 },
  quizId: { type: String, required: true },
});

export const QuizSessionParticipant = mongoose.model<IQuizSessionParticipant>('QuizSessionParticipant', quizSessionParticipantSchema);
