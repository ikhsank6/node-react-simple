import { Job } from './Job';

export class LogJob extends Job {
    async execute(): Promise<void> {
        console.log(`Log message: ${this.payload.message}`);
    }
}