import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from "bcryptjs";
import { getPagination, getPagingData } from '../utils/pagination';
import HttpCodes from '../utils/httpCodes';
const { Op } = require('sequelize');
// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, password, name, keterangan,email } = req.body;

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashedPassword,
            name,
            keterangan,
            email,
        });

        return res.status(HttpCodes.CREATED).json(user);
    } catch (error) {
        return res.error('Internal Server Error',HttpCodes.INTERNAL_SERVER_ERROR);
    }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const { page, limit, kueri } = req.query;
        const { size, offset } = getPagination(page as string, limit as string);
        
        // Build the filter condition
        const whereCondition = {
            ...(kueri && { username: { [Op.like]: `%${kueri}%` } }), // Filter by name using LIKE
        };

        const data = await User.findAndCountAll({ limit: size, offset: offset, where: whereCondition });
        const { totalData, results, totalPages, currentPage, perPage } = getPagingData(data, page as string, size);

        return res.success(results, {
            totalData,
            totalPages,
            currentPage,
            perPage,
        });

    } catch (error) {
        return res.error('Internal Server Error',HttpCodes.INTERNAL_SERVER_ERROR);
    }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.error('User not found',HttpCodes.NOT_FOUND);
        }

        return res.json(user);
    } catch (error) {
        return res.error('Internal Server Error', HttpCodes.INTERNAL_SERVER_ERROR);
    }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username, password, name, keterangan } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.error('User not found', HttpCodes.NOT_FOUND);
        }

        if (username) user.username = username;
        if (password) user.password = await bcrypt.hash(password, 10);
        if (name) user.name = name;
        if (keterangan) user.keterangan = keterangan;

        await user.save();

        return res.json(user);
    } catch (error) {
        return res.error('Internal Server Error', HttpCodes.INTERNAL_SERVER_ERROR);
    }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.error('User not found', HttpCodes.NOT_FOUND);
        }

        await user.destroy();

        return res.success({});
    } catch (error) {
        return res.error('Internal Server Error', HttpCodes.INTERNAL_SERVER_ERROR);
    }
};
