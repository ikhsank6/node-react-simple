import { MailJob } from "../jobs/MailJob"; 
import { Job } from "../jobs/Job";

// Map of job class names to classes
const jobClassLoader: { [key: string]: new (payload: any) => Job } = {
    MailJob: MailJob,
};

export default jobClassLoader;