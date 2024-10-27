
import { Kafka, Producer } from 'kafkajs';

const defaultClient = {
  requestTimeout: 30000,
};

const defaultConsumerConfig = {
  groupId: '',
  sessionTimeout: 120000, // 2 minutes, default 30s
  heartbeatInterval: 10000, // 10 seconds, default 3s
  maxInFlightRequests: 1,
  retry: {
    retries: 5,
  },
};

const kafka = new Kafka({
  ...defaultClient,
  clientId: 'vocabulary-quiz',
  brokers: [process.env.KAFKA_BROKER as string],
});

const kafkaPrefix = '[Kafka]';

let producer: Producer;

const initProducer = async () => {
  producer = kafka.producer();
  try {
    await producer.connect();
  } catch (error) {
    console.error(
      `${kafkaPrefix} Producer Initiation failed, message: ${(error as any)?.message}, errorJSON: ${JSON.stringify(error)}, `
    );
  }
};

const initConsumer = async (handleMessage: any, topicName: string) => {
  try {
    const consumer = kafka.consumer({
      ...defaultConsumerConfig,
      groupId: 'quiz-session-group',
      allowAutoTopicCreation: false,
    });

    await consumer.connect();
    await consumer.subscribe({ topic: topicName, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        await handleMessage(message);
      },
    });
  } catch (error) {
    console.error(
      `${kafkaPrefix} Consumer Initiation failed, message: ${(error as any)?.message}, errorJSON: ${JSON.stringify(error)}, `
    );
  }
};

const send = async (topic: string, message: any) => {
  try {
    await producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });
  } catch (error) {
    console.error(
      `${kafkaPrefix} Send kafka message error, message: ${(error as any)?.message}, errorJSON: ${JSON.stringify(error)}`
    );
  }
};

export { send, initConsumer, initProducer };


export default kafka;


