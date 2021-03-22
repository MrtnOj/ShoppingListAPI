import { ItemInterface } from '../models/item'

import Item from '../models/item'

import { Request, Response, NextFunction } from 'express'

export const getItems = (req: Request, res: Response, next: NextFunction) => {
    Item.findAll()
    .then(result => {
        res.json(result)
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
}

export const createItem = (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name
    const categoryId = req.body.categoryId
    const lasts = req.body.lasts
    const lastBought = req.body.lastBought

    Item.create({
        name: name,
        categoryId: categoryId,
        lasts: lasts,
        last_bought: lastBought
    })
    .then(result => {
        res.send(result)
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
}
