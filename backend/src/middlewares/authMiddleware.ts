import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import UserAttributes from '../interface/user.interface';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.error("Unauthorized",401);
    }

    jwt.verify(token, process.env.JWT_SECRET!, async (err, decodedToken) => {
        if (err) {
            return res.error("Forbidden",403);
        }

        try {
            const user = await User.findByPk((decodedToken as any).id); // Adjust based on your JWT payload structure
            if (!user) {
                return res.error("Not Found",404);
            }
            (req as any).user = user; // Use type assertion to set user
            next();
        } catch (error) {
            return res.error("Internal Server Error",500);
        }
    });
};

export default authenticateToken;
