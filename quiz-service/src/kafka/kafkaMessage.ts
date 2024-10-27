import { KafkaMessage } from 'kafkajs';
import { KAFKA_EVENT_TYPES } from '../config/constants';
import { handleQuizSessionJoining } from './handlers';

export const handleTrackingMessage = async (queueMessage: KafkaMessage) => {
  try {
    console.info(`[Kafka] Handle tracking order message: [Data] queueMessage ${queueMessage?.value?.toString()}`);
    if (!queueMessage.value) {
      console.error('[Kafka] queueMessage body is empty!');
      return;
    }

    const message = JSON.parse(queueMessage?.value?.toString()?.replace(/\'/g, '"'));
    switch (message.eventType) {
      case KAFKA_EVENT_TYPES.QUIZ_SESSION_CREATION:
        await handleQuizSessionJoining(message?.data);
        break;
      default:
        console.error(`[Kafka] wrong eventType: ${queueMessage?.value?.toString()}`);
        break;
    }
  } catch (error) {
    console.error(`[Kafka] Handle tracking order message: [Failed] ${JSON.stringify(error)}`);
  }
};
