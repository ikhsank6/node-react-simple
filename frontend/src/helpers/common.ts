import { toast } from 'react-toastify';

export const errorMessage = (message: string | undefined) => {
    toast.error(message);
}

export const successMessage = (message: string) => {
    toast.success(message);
}