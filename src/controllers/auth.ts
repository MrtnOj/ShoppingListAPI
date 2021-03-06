import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user'
import { Request, Response, NextFunction } from 'express'

export const signUp = (req: Request, res: Response, next: NextFunction) => {
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
            res.status(201).json({ message: 'User created! You can now log in', result})
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err)
        })
}

export const logIn = (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username
    const password = req.body.password
    
}