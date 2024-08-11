import axios from 'axios';
import { errorMessage } from './common';

export async function Request<T>(request: Promise<T>): Promise<T | null> {
    try {
        const response = await request;
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.response);
            if (!error.response?.data?.meta?.status) {
                errorMessage(error.response?.data?.meta?.message);
            }

            if (!error.response?.data?.meta) {
                errorMessage(error.response?.statusText);
            }
        }
        return null;
    }
}
