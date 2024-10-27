import express from 'express';
import { createServer } from 'node:http';
import apiRoutes from './routes/api';
import initializeSocket from './config/socket';
import './config/db';
import { initConsumer, initProducer } from './config/kafka';
import { handleTrackingMessage } from './kafka/kafkaMessage';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const server = createServer(app);
initializeSocket(server);

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/health', (req, res) => {
  res.send('Hello World!')
})

server.listen(process.env.PORT, async () => {
  await initProducer();
  initConsumer(handleTrackingMessage, 'vocabulary-quiz-topic');

  console.log(`Server running on port ${process.env.PORT}`);
});

