import List from '../models/list'
import ListItem from '../models/listItem'
import Item from '../models/item'
import { Request, Response, NextFunction } from 'express'
import { ListAttributes } from '../models/list'
import { ItemInterface } from '../models/item'

export const getUserLists = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId
    List.findAll({ where: { userId: userId }})
        .then(list => {
            return res.json(list)
        })
        .catch(err => {
            console.log(err)
        })
}

export const getListDetails = (req: Request, res: Response, next: NextFunction) => {
    const listId = parseInt(req.params.listId)
    List.findOne({ where: { id: listId }, 
        include: {
            model: Item
        }
    })
    .then(list => {
        return res.json(list)
    })
    .catch(err => {
        console.log(err)
    })
}

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
            .then(response => {
                console.log(res)
                res.send({ message: 'List created'})
            })
        })
    })
    .catch(err => {
        console.log(err)
    })
}