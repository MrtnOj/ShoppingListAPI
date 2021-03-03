import Category from '../models/category'

import { Request, Response, NextFunction } from 'express'

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
