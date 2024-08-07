import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (userId: number, expiresIn: string) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn });
};

export const generateAccessToken = (userId: number) => {
    return generateToken(userId, process.env.JWT_ACCESS_EXPIRATION!);
};

export const generateRefreshToken = (userId: number) => {
    return generateToken(userId, process.env.JWT_REFRESH_EXPIRATION!);
};

export const decodeToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET!);
}
