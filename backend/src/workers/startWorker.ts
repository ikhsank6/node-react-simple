import { getChannel, assertQueue } from '../config/rabbitmq';
import jobClassLoader from '../utils/mappingJobName';




export const startWorker = async (queueName: string): Promise<void> => {
    const channel = getChannel();
    await assertQueue(queueName);

    channel.consume(queueName, async (msg) => {
        if (msg !== null) {
            const { jobClassName, payload } = JSON.parse(msg.content.toString());

            const JobClass = jobClassLoader[jobClassName];
            if (!JobClass) {
                console.error(`No job class found for name: ${jobClassName}`);
                channel.nack(msg);
                return;
            }

            // Create job instance and execute
            const job = new JobClass(payload);
            try {
                await job.execute();
                channel.ack(msg);
            } catch (error) {
                console.error('Error processing job:', error);
                channel.nack(msg);
            }
        }
    });

    console.log(`Worker started for queue: ${queueName}`);
};
