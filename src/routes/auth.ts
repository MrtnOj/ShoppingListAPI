import { body } from 'express-validator'
import { Router } from 'express'
import { signUp, logIn } from '../controllers/auth'
import User from '../models/user'

const router = Router()

router.post('/signup', 
    [body('email')
        .isEmail()
        .withMessage('Please enter a valid email')
        .custom(value => {
           return User.findOne({ where: { email: value} })
            .then(user => {
                console.log(user)
                if (user) {
                    return Promise.reject('Email address already exists')
                    // throw error for handling
                }
            })
        })
        .withMessage('Email address already exists')
        .normalizeEmail(),
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

export default router