import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from "bcryptjs";
import { getPagination, getPagingData } from '../utils/pagination';

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, password, name, keterangan } = req.body;

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashedPassword,
            name,
            keterangan,
        });

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page as string, size as string);
        const data = await User.findAndCountAll({ limit, offset });
        const { totalData, results, totalPages, currentPage, perPage } = getPagingData(data, page as string, limit);

        res.success(results, {
            totalData,
            totalPages,
            currentPage,
            perPage,
        });

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get a user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username, password, name, keterangan } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (username) user.username = username;
        if (password) user.password = await bcrypt.hash(password, 10);
        if (name) user.name = name;
        if (keterangan) user.keterangan = keterangan;

        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.destroy();

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
