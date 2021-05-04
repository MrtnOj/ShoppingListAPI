import List from '../models/list'
import ListItem from '../models/listItem'
import UserItem from '../models/userItem'
import { Request, Response, NextFunction } from 'express'
import { ListAttributes } from '../models/list'
import { ItemInterface } from '../models/item'
import Category from '../models/category'
import UserCategory from '../models/userCategory'

export const getUserLists = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId
    if (userId !== req.userId) {
        return
    }
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
    const userId = req.query.userId
    if (userId !== req.userId) {
        return
    }
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
    if (userId !== req.userId) {
        return
    }
    let result = 'List created successfully'
    if (list.length < 1) {
        return res.status(400).json({
            error: 'Empty list you fucknut'
        })
    }
    List.create({
        userId: userId
    })
    .then((createdList: any) => {
        list.forEach((listItem: any) => {
            ListItem.create({
                listId: createdList.id,
                userItemId: listItem.id
            })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
                result = `Error saving list, item ID: ${listItem.id}`
            })
        })
        res.json(result)
    })
    .catch(err => {
        console.log(err)
    })
}

export const deleteList = (req: Request, res: Response, next: NextFunction) => {
    const listId: number = parseInt(req.params.listId)
    const userId = req.query.userId
    if (userId !== req.userId) {
        return
    }
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
    const userId = req.body.userId
    const itemName: string = req.body.name 
    const category: string = req.body.category
    if (userId !== req.userId) {
        return
    }
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
        UserCategory.findOne({ where: { name: category }})
        .then(cat => {
            if (cat) {
                UserItem.create({
                    name: itemName,
                    userCategoryId: cat.get('id')
                })
                .then(item => {
                    ListItem.create({
                        listId: listId,
                        userItemId: item.get('id')
                    })
                    .then(response => {
                        res.send(response)
                    })
                })
            } else {
                UserCategory.create({
                    name: category
                })
                .then(category => {
                    UserItem.create({
                        name: itemName,
                        userCategoryId: category.get('id')
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
        UserItem.create({
            name: itemName
        })
        .then(item => {
            ListItem.create({
                listId: listId,
                userItemId: item.get('id')
            })
            .then(response => {
                res.send(response)
            })
        })
    }
}