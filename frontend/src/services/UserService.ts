import api from '../helpers/axios';
import { createQueryParams } from '../helpers/common';
import { Request } from '../helpers/request';

class UserService {
    private url: string;

    constructor() {
        this.url = 'users';
    }

    public async getList(params: any, filters: any) {
        const query = createQueryParams({
            limit: params.limit,
            page: params.page,
            ...filters
        });
        const response = await Request(api.get(`${this.url}?${query}`));
       
        return response?.data;
    }
}

export default new UserService();