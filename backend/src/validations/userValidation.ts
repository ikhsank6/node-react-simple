import { body } from 'express-validator';

export const registerValidation = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .isString().withMessage('Username must be a string')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .trim().escape(),
    // body('password')
    //     .notEmpty().withMessage('Password is required')
    //     .isString().withMessage('Password must be a string')
    //     .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    //     .trim().escape()
];

export const loginValidation = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .isString().withMessage('Username must be a string')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .trim().escape(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isString().withMessage('Password must be a string')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .trim().escape()
];