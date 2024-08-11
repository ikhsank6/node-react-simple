import { body } from 'express-validator';

export const registerValidation = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .isString().withMessage('Username must be a string')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .trim().escape(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/\d/)
        .withMessage('Password must contain at least one number')
        .matches(/[@$!%*?&]/)
        .withMessage('Password must contain at least one special character (@$!%*?&)'),
    body('email')
        .notEmpty().withMessage('Email is required')
];

export const loginValidation = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .isString().withMessage('Username must be a string')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .trim().escape(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .trim().escape()
];

export const refreshTokenValidation = [
    body('refreshToken')
        .notEmpty().withMessage('refreshToken is required')
];