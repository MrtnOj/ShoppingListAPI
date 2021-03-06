import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import User from '../models/user'
import { Request, Response, NextFunction } from 'express'

export const signUp = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array()[0].msg)
        return res.status(400).json({
            error: errors.array()[0].msg
        })
        // const error = new Error(errors.array()[0].msg);
        // console.log(error)
        // throw error;
    }
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    bcrypt
        .hash(password, 12)
        .then(hashedPw => {
            User.create({
                username: username,
                email: email,
                password: hashedPw
            })
            .then(result => {
                res.send(result)
                console.log(result)
            })
            .catch(err => {
                console.log(err)
            })
        })
        .then(result => {
            return res.status(201).json({ message: 'User created! You can now log in', result})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

export const logIn = (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username
    const password = req.body.password

}