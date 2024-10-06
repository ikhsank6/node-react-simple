import React, { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import { Pagination } from 'flowbite-react';
import UserService from "../services/UserService";
import { XMarkIcon } from '@heroicons/react/20/solid';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

interface Filters {
    kueri: string;
}

const User: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filters, setFilters] = useState<Filters>({
        kueri: ""
    });
    const [data, setData] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);

    const fetchData = async (page: number, search: any, limit: number) => {
        try {
            const response = await UserService.getList({
                page: page,
                limit: limit
            }, search);
            setData(response.data); // Assuming API returns an array of users
            setTotalPages(response.meta.pages.totalPages); // Assuming API returns total pages
            setCurrentPage(response.meta.pages.currentPage);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const changePage = async (limit: number) => {
        setLimit(limit);
        setCurrentPage(1);
    };

    useEffect(() => {
        fetchData(currentPage, filters, limit);
    }, [currentPage, filters, limit]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setCurrentPage(1); // Reset to first page on search
    };

    const clearSearch = () => {
        setFilters({ kueri: ''});
    };

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">User Table</h1>
                {/* Search Input */}
                <div className="mb-4 relative">
                    <input
                        type="text"
                        placeholder="Search users"
                        className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        name="kueri"
                        value={filters.kueri}
                        onChange={handleSearchChange}
                    />

                    {/* Clear Icon */}
                    {filters.kueri && (
                        <button
                            onClick={clearSearch}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center" // Position the icon
                            aria-label="Clear search"
                        >
                            <XMarkIcon className="h-5 w-5 text-gray-600 hover:text-gray-900" />
                        </button>
                    )}
                </div>
                {/* Items per page dropdown */}
                <div className="mb-4">
                    <label htmlFor="limit" className="mr-2">Items per page:</label>
                    <select
                        id="limit"
                        className="border rounded-md p-2"
                        value={limit}
                        onChange={(e) => changePage(Number(e.target.value))}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>

                {/* Table */}
                <table className="table-auto w-full text-left border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user) => (
                            <tr key={user.id}>
                                <td className="px-4 py-2 border">{user.id}</td>
                                <td className="px-4 py-2 border">{user.name}</td>
                                <td className="px-4 py-2 border">{user.email}</td>
                                <td className="px-4 py-2 border">{user.username}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="mt-4 flex justify-between items-center">
                    <div>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                    <p>
                        Page {currentPage} of {totalPages}
                    </p>
                </div>
            </div>
        </Layout>
    );
}

export default User;