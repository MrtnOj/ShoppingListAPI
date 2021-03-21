import { body } from 'express-validator'
import { Router } from 'express'
import { signUp, logIn } from '../controllers/auth'
import User from '../models/user'

const router = Router()

router.post('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom(value => {
           return User.findOne({ where: { email: value} })
            .then(user => {
                if (user) {
                    return Promise.reject('Email address already exists')
                }
            })
        })
        .normalizeEmail(),
    body('username')
        .trim()
        .isLength({ min: 2 })
        .withMessage('Username must be at least 2 characters long')
        .custom(value => {
            return User.findOne({ where: {username: value}})
            .then(user => {
                if (user) {
                    return Promise.reject('Username is already taken')
                }
            })
        }),
    body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters.'),
    body('confirmPassword')
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation doesn\'t match')
            }
            return true
        })
    ], 
signUp)

router.post('/login', logIn)

export default router