import { QuizSession } from '../models/quizSession';
import { Question } from '../models/question';
import { redisClient } from '../config/db';
import { send } from '../config/kafka';
import { getSocketInstance } from '../config/socket'

export const createQuizSession = async () => {

  try {
    // Step 1: Fetch Questions
    const questions = await Question.find().limit(10);
    const questionList = questions.map(q => q.toObject());
    const questionIds = questionList.map((question) => question._id);

    // Step 2: Create and Save a New Quiz Session
    const newQuizSession = new QuizSession({ questions: questionIds });
    await newQuizSession.save();

    // Cache questions with quiz session ID as the key in Redis
    await redisClient.setEx(
      `${newQuizSession._id.toString()}_quiz_session_questions`,
      3600,
      JSON.stringify(questionList)
    );

    // Step 3: Create Leaderboard for this session
    await createLeaderboard();

    return { quizId: newQuizSession._id.toString(), questions: questionList };
  } catch (error) {
    console.error('Error creating quiz session:', error);
    return { message: 'Error creating quiz session' };
  }
};

const createLeaderboard = async () => {
  // This is mock function, it will call API to Leaderboard service to create a leaderboard for this session
};

export const joinIntoQuizSession = async ({ quizId, userId }: { quizId: string; userId: string; }) => {
  try {
    // Step 1: Fetch quiz session
    const quizSession = await QuizSession.findById(quizId).exec();

    if (!quizSession) {
      return { message: 'The Quiz Session does not exist' };
    }

    // Step 2: Fetch Questions
    const questionsFromCache = await redisClient.get(`${quizId}_quiz_session_questions`);
    let questionList;

    if (!questionsFromCache) {
      const questions = await Question.find().limit(10);
      questionList = questions.map(q => q.toObject());
    }
    questionList = JSON.parse(questionsFromCache || '');

    // Step 3: Emit Quiz Session Data to Client via Socket.IO
    const io = getSocketInstance();
    // Notify other clients in the session room
    io.to(quizId).emit("userJoined", {
      message: `A new user joined session ${quizId}`, 
      userId: userId,
    });

    // Step 4: Publish Event to Kafka for Leaderboard and Participants
    await send(
      'quiz-session-joining',
      {
        quizId,
        userId
      }
    );

    return { quizId, questions: questionList };
  } catch (error) {
    console.error('Error join quiz session:', error);
    return { message: 'Error join quiz session' };
  }
};
