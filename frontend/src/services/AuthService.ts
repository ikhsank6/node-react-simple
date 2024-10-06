import api from '../helpers/axios';
import { Request } from '../helpers/request';

class AuthService {
    private url: string;

    constructor() {
        this.url = 'auth';
    }

    public async login(params: any) {
        const response = await Request(api.post(`${this.url}/login`, params));
        // if (response) {
        //     localStorage.setItem('accessToken', response.data.data.accessToken);
        //     localStorage.setItem('refreshToken', response.data.data.refreshToken);
        // }
        
        return response?.data;
    }

    public async register(userData: any) {
       const response = await Request(api.post(`${this.url}/register`, userData));
        // if (response) {
        //     localStorage.setItem('accessToken', response.data.data.accessToken);
        //     localStorage.setItem('refreshToken', response.data.data.refreshToken);
        // }
        
        return response?.data;
    }

    public async refresh(refreshToken: string) {
        const response = await Request(api.post(`${this.url}/refresh`, { refreshToken }));
        return response?.data;
    }
}

export default new AuthService();