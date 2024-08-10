import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { generateAccessToken, generateRefreshToken, decodeToken } from "../utils/token";
import { validationResult } from 'express-validator';
import { mappingErrors } from "../utils/helper";
import HttpCodes from "../utils/httpCodes";
import { dispatchJob } from "../config/queue";
import listQueue from "../utils/listQueue";
import { MailJob } from "../jobs/MailJob";

export const register = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.error(mappingErrors(errors.array()),HttpCodes.BAD_REQUEST);
    }

    try {
        const { username, password, name, keterangan } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword, name, keterangan });

        // Send confirmation email
        await dispatchJob(listQueue.MAIL, new MailJob({
            from: "Your App",
            to: 'ikhsan@mail.com',
            subject: 'Registration Successful',
            text: `Hello ${user.name},\n\nYour registration was successful!`,
            html: `<p>Hello ${user.name},</p><p>Your registration was successful!</p>`,
        }));

        return res.success(user);
    } catch (error) {
        throw error;
        return res.error("Internal Server Error", HttpCodes.INTERNAL_SERVER_ERROR)
    }
};

export const login = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.error(mappingErrors(errors.array()), HttpCodes.BAD_REQUEST);
    }

    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.error("Invalid credentials", HttpCodes.UNAUTHORIZED);
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
    return res.success(resp);
};

export const refresh = (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.error("Unauthorized", HttpCodes.UNAUTHORIZED);
    }

    try {
        const decoded = decodeToken(refreshToken);
        const accessToken = generateAccessToken((decoded as any).id);
        return res.success({ accessToken, refreshToken });
    } catch (error) {
        return res.error("Invalid refresh token", HttpCodes.UNAUTHORIZED);
    }
};
