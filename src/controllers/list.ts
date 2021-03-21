import List from '../models/list'
import ListItem from '../models/listItem'
import { Request, Response, NextFunction } from 'express'
import { ListAttributes } from '../models/list'
import { ItemInterface } from '../models/item'

export const saveList = (req: Request, res: Response, next: NextFunction) => {
    const list: ItemInterface[] = req.body.list
    const userId: number = req.body.userId
    if (list.length < 1) {
        return res.status(400).json({
            error: 'Empty list you fucknut'
        })
    }
    List.create({
        userId: userId
    })
    .then(result => {
        list.forEach((listItem: ItemInterface) => {
            ListItem.create({
                listId: result.id,
                itemId: listItem.id
            })
            .then(res => {
                console.log(res)
            })
        })
    })
    .catch(err => {
        console.log(err)
    })
}