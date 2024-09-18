import {body} from 'express-validator';
import {validator} from '../middlewares/validator';

export const registerValidator = [
    body('username').isString().isLength({min: 2}).trim().withMessage('Dein Name muss mindestens 2 Zeichen lang sein'),
    body('email').isEmail().withMessage('Bitte gib eine gültige Email-Adresse ein'),
    body('password').isLength({min: 6}).withMessage('Dein Passwort muss mindestens 6 Zeichen lang sein'),
    validator
];

export const loginValidator = [
    body('email').isEmail().withMessage('Bitte gib eine gültige Email-Adresse ein'),
    body('password').isLength({min: 6}).withMessage('Dein Passwort muss mindestens 6 Zeichen lang sein'),
    validator
]

export const updateValidator = [
    body('username').isString().isLength({min: 2}).trim().withMessage('Dein Name muss mindestens 2 Zeichen lang sein'),
    validator
]