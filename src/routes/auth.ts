import { body } from 'express-validator'
import { Router } from 'express'
import { signUp, logIn } from '../controllers/auth'
import User from '../models/user'

const router = Router()

router.post('/signup', 
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom(value => {
        User.findOne({ where: { email: value} })
        .then(user => {
            if (user) {
                return 
            }
        })
    })
    .withMessage('Email address already exists')
    .normalizeEmail(), 
signUp)

export default router