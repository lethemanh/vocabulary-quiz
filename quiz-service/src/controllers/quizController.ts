import { Request, Response } from 'express';
import { createQuizSession, joinIntoQuizSession } from '../services/quizService';

export const createQuizSessionControler = async (req: Request, res: Response) => {
  const session = await createQuizSession();
  res.status(201).json(session);
};

export const joinQuizSessionControler = async (req: Request, res: Response) => {
  const { quizId, userId } = req.body;
  const session = await joinIntoQuizSession({ quizId, userId });
  res.status(201).json(session);
};
