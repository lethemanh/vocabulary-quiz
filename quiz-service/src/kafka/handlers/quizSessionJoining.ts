import { QuizSessionParticipant } from '../../models/quizSessionParticipant';

export const handleQuizSessionJoining = async (data: { quizId: string; userId: string; }) => {
  try {
    const { quizId, userId } = data;
    // Check if participant exists
    const existingParticipant = await QuizSessionParticipant.findOne({ quizId, userId });
    if (existingParticipant) {
      console.log(`Participant for quiz session ${quizId} already exists.`);
      return;
    }

    // Step 1: Create a new Participant
    const quizSessionParticipant = new QuizSessionParticipant({ quizId, userId, score: 0 });
    await quizSessionParticipant.save();

    console.log(`Participant record created for quiz session ${quizId}`);
  } catch (error) {
    console.error(`Error processing quiz session creation for ID ${data.quizId}:`, error);
  }
};
