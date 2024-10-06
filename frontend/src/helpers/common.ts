import { toast } from 'react-toastify';

export const errorMessage = (message: string | undefined) => {
    toast.error(message);
}

export const successMessage = (message: string) => {
    toast.success(message);
}

export function createQueryParams(query: any) {
    return Object.keys(query)
        .map((key) => {
            if (query[key]) return key + '=' + query[key]
        })
        .filter((item) => item)
        .join('&')
}