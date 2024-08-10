import { getChannel, assertQueue } from '../config/rabbitmq';
import { Job } from '../jobs/Job';

export const setupQueue = async (): Promise<void> => {
    await assertQueue('jobQueue');
    console.log('Queue jobQueue is ready');
};

export const dispatchJob = async (queueName: string, job: Job): Promise<void> => {
    const channel = getChannel();
    await assertQueue(queueName);

    // Serialize job class name and payload
    const jobData = {
        jobClassName: job.constructor.name,
        payload: job.payload,
    };

    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(jobData)), { persistent: true });
    console.log(`Job of class ${job.constructor.name} dispatched to queue ${queueName}`);
};
