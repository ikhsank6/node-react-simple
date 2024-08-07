import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { generateAccessToken, generateRefreshToken, decodeToken } from "../utils/token";
import { validationResult } from 'express-validator';
import { mappingErrors } from "../utils/helper";

export const register = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.error(mappingErrors(errors.array()),400);
    }

    try {
        const { username, password, name, keterangan } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword, name, keterangan });

        res.success(user);
    } catch (error) {
        res.error("Error", 500)
    }
};

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.error("Invalid credentials", 401);
    }

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    let resp = {
        id: user.id,
        name: user.name,
        keterangan: user.keterangan,
        accessToken: accessToken,
        refreshToken: refreshToken
    };
    res.success(resp);
};

export const refresh = (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.error("Unauthorized", 401);
    }

    try {
        const decoded = decodeToken(refreshToken);
        const accessToken = generateAccessToken((decoded as any).id);
        res.success({ accessToken, refreshToken });
    } catch (error) {
        return res.error("Invalid refresh token", 401);
    }
};
