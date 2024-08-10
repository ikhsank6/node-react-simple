import amqp from 'amqplib';

let channel: amqp.Channel;

export const connectRabbitMQ = async (): Promise<void> => {
    try {
        const connection = await amqp.connect({
            protocol: 'amqp',
            hostname: process.env.RABBITMQ_URL || 'localhost',
            port: Number(process.env.RABBITMQ_PORT), // Default RabbitMQ port
            username: process.env.RABBITMQ_USERNAME,
            password: process.env.RABBITMQ_PASSWORD,
        });

        channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');
    } catch (error) {
        console.error('Failed to connect to RabbitMQ', error);
    }
};

export const getChannel = (): amqp.Channel => {
    if (!channel) {
        throw new Error('RabbitMQ channel is not initialized');
    }
    return channel;
};

export const assertQueue = async (queueName: string): Promise<void> => {
    const channel = getChannel();
    await channel.assertQueue(queueName, { durable: true });
};
