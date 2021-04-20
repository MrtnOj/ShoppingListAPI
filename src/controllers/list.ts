import List from '../models/list'
import ListItem from '../models/listItem'
import UserItem from '../models/userItem'
import Item from '../models/item'
import { Request, Response, NextFunction } from 'express'
import { ListAttributes } from '../models/list'
import { ItemInterface } from '../models/item'
import Category from '../models/category'

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
            model: UserItem
        }
    })
    .then(list => {
        res.json(list)
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
    .then((result: any) => {
        list.forEach((listItem: any) => {
            ListItem.create({
                listId: result.id,
                userItemId: listItem.id
            })
            .then(response => {
                console.log(res)
                res.json(response)
            })
            .catch(err => {
                console.log(err)
            })
        })
    })
    .catch(err => {
        console.log(err)
    })
}

export const deleteList = (req: Request, res: Response, next: NextFunction) => {
    const listId: number = parseInt(req.params.listId)
    List.destroy({ where: { id: listId }})
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        console.log(err)
    })
}

export const insertIntoList = (req: Request, res: Response, next: NextFunction) => {
    const listId: number = parseInt(req.params.listId)
    const itemId: number = req.body.itemId
    const itemName: string = req.body.name 
    const category: string = req.body.category
    if (itemId) {
        ListItem.create({
            listId: listId,
            itemId: itemId
        })
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            console.log(err)
        })
    } else if (!itemId && category !== '') {
        Category.findOne({ where: { name: category }})
        .then(cat => {
            if (cat) {
                Item.create({
                    name: itemName,
                    categoryId: cat.get('id')
                })
                .then(item => {
                    ListItem.create({
                        listId: listId,
                        itemId: item.get('id')
                    })
                    .then(response => {
                        res.send(response)
                    })
                })
            } else {
                Category.create({
                    name: category
                })
                .then(category => {
                    Item.create({
                        name: itemName,
                        categoryId: category.get('id')
                    })
                    .then(item => {
                        ListItem.create({
                            listId: listId,
                            itemId: item.get('id')
                        })
                        .then(response => {
                            res.send(response)
                        })
                    })
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    } else if (!itemId && category === '') {
        Item.create({
            name: itemName
        })
        .then(item => {
            ListItem.create({
                listId: listId,
                itemId: item.get('id')
            })
            .then(response => {
                res.send(response)
            })
        })
    }
}