import { ItemInterface } from '../models/item'

import { Item } from '../models/item'

import { Request, Response, NextFunction } from 'express'

const items: ItemInterface[] = [
    {id: 1, name: 'Sitt', categoryId: 5}
]

export const getItems = (req: Request, res: Response, next: NextFunction) => {
    Item.fetchAll()
    .then((result: any) => {
        return res.status(200).json(result.rows)
    })
    .catch((err: any) => {
        console.log(err)
    })
}