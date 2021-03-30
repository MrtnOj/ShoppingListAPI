import Category from '../models/category'

import { Request, Response, NextFunction } from 'express'
import UserCategory from '../models/userCategory'

export const getCategories = (req: Request, res: Response, next: NextFunction) => {
    Category.findAll()
    .then(result => {
        res.json(result)
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
}

export const getUserCategories = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId
    UserCategory.findAll({ where: { userId: userId }})
    .then(result => {
        res.json(result)
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
}

export const createCategory = (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name

    Category.create({
        name: name,
    })
    .then(result => {
        res.send(result)
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
}

export const createUserCategory = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId
    const name =  req.body.name
    UserCategory.create({
        name: name,
        userId: userId
    })
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        console.log(err)
    })
}
