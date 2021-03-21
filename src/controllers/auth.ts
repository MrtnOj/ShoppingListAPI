import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import User from '../models/user'
import { Request, Response, NextFunction } from 'express'
import { UserAttributes } from '../models/user'

export const signUp = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg
        })
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
                // res.send(result)
                console.log(result.username)
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
    let loadedUser: UserAttributes | null
    User.findOne({where: { username: username}} ) 
        .then((user) => {
            if (!user) {
                return Promise.reject('No such user you dumb fuck')
            }
            loadedUser = user
            return bcrypt.compare(password, user.password)
        })
        .then(isEqual => {
            if (!isEqual) {
                return Promise.reject('Wrong password fuckin daft toad')
            }
            const token = jwt.sign({
                username: loadedUser?.username,
                userId: loadedUser?.id.toString()
            },
            'Theguywasaninteriordecorator,killed16czechoslovakians'
            )
            return res.status(200).json({ token: token, userId: loadedUser?.id.toString(), username: loadedUser?.username})
        })
        .catch(err => {
            return res.status(400).json({ error: err})
            next(err)
        })
}