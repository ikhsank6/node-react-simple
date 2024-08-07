
interface PaginationParams {
    limit: number;
    offset: number;
}

interface PaginatedResult<T> {
    totalData: number;
    results: T[];
    totalPages: number;
    currentPage: number;
    perPage: number,
}

const getPagination = (page?: string, size?: string): PaginationParams => {
    const limit = size && !isNaN(parseInt(size, 10)) ? parseInt(size, 10) : 10;
    const parsedPage = page && !isNaN(parseInt(page, 10)) ? parseInt(page, 10) : 1;
    const offset = (parsedPage - 1) * limit;
    return { limit, offset };
};

const getPagingData = <T>(data: { count: number, rows: T[] }, page: string | undefined, limit: number): PaginatedResult<T> => {
    const { count: totalData, rows: results } = data;
    const currentPage = page && !isNaN(parseInt(page, 10)) ? parseInt(page, 10) : 1;
    const totalPages = Math.ceil(totalData / limit);
    return { totalData, results, totalPages, currentPage, perPage: limit };
};

export { getPagination, getPagingData, PaginationParams, PaginatedResult };
