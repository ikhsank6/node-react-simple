
interface PaginationParams {
    size: number;
    offset: number;
}

interface PaginatedResult<T> {
    totalData: number;
    results: T[];
    totalPages: number;
    currentPage: number;
    perPage: number,
}

const getPagination = (page?: string, limit?: string): PaginationParams => {
    const size = limit && !isNaN(parseInt(limit,10)) ? parseInt(limit,10) : 10;
    const parsedPage = page && !isNaN(parseInt(page,10)) ? parseInt(page,10) : 1;
    const offset = (parsedPage - 1) * size;
    return { size, offset };
};

const getPagingData = <T>(data: { count: number, rows: T[] }, page: string | undefined, limit: number): PaginatedResult<T> => {
    const { count: totalData, rows: results } = data;
    const currentPage = page && !isNaN(parseInt(page, 10)) ? parseInt(page, 10) : 1;
    const totalPages = Math.ceil(totalData / limit);
    return { totalData, results, totalPages, currentPage, perPage: limit };
};

export { getPagination, getPagingData, PaginationParams, PaginatedResult };
