import List from '../models/list'
import ListItem from '../models/listItem'
import UserItem from '../models/userItem'
import { Request, Response, NextFunction } from 'express'
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
    const list = req.body.list
    const userId: number = req.body.userId
    if (userId !== req.userId) {
        return
    }
    let result = 'List created successfully'
    if (list.length < 1) {
        return res.status(400).json({
            error: 'Empty list'
        })
    }
    List.create({
        userId: userId,
        name: list.name
    })
    .then((createdList: any) => {
        list.items.forEach((listItem: any) => {
            ListItem.create({
                listId: createdList.id,
                userItemId: listItem.id,
                comment: listItem.comment
            })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
                result = `Error saving list, item ID: ${listItem.id}`
            })
        })
        res.json(createdList.id)
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
            userItemId: itemId
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

export const removeListItem = (req: Request, res: Response, next: NextFunction) => {
    const listItemId = req.params.listItemId
    const userId = req.query.userId
    if (userId !== req.userId) {
        return
    }
    ListItem.destroy({ where: { id: listItemId }})
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        console.log(err)
    })
}

export const changeListName = (req: Request, res: Response, next: NextFunction) => {
    const newName = req.body.newName
    const listId = req.params.listId
    const userId = req.body.userId
    if (userId !== req.userId) {
        return
    }
    List.update({ name: newName }, { where: { id: listId }})
    .then(newList => {
        res.json(newList)
    })
    .catch(err => {
        console.log(err)
    })
}