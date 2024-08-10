import { Job } from './Job';
import transporter from '../config/mailer'; // Example for sending emails
import { SendMailOptions } from 'nodemailer';

export class MailJob extends Job {
    async execute(): Promise<void> {
        const mailOptions: SendMailOptions = this.payload;
        try {
            await transporter.sendMail(mailOptions);
            console.log(`Email sent to: ${mailOptions.to}`);
        } catch (error) {
            console.error(`Error sending email:`, error);
        }
    }
}
