import express from 'express';
import { createQuizSessionControler, joinQuizSessionControler } from '../controllers/quizController';

const router = express.Router();

router.post('/quiz', createQuizSessionControler);
router.post('/quiz/join', joinQuizSessionControler);

export default router;
