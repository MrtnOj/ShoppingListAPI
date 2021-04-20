import { ItemInterface } from '../models/item'
import Item from '../models/item'
import { Request, Response, NextFunction } from 'express'
import UserItem from '../models/userItem'
import Category from '../models/category'
import UserCategory from '../models/userCategory'

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

export const getUserItems = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId
    UserItem.findAll({ where: { userId: userId }})
    .then(result => {
        res.json(result)
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
}

export const itemsBought = (req: Request, res: Response, next: NextFunction) => {
    const items = req.body.items
    const date = new Date()
    let result = 'Bought dates updated'
    items.forEach((item: ItemInterface) => {
        UserItem.update({ lastBought: date }, { where: { id: item.id } })
        .then(result => {
            console.log(`Updated successfully item id: ${item.id}`)
        })
        .catch(err => {
            console.log(err)
            result = `Updating failed for item with id ${item.id}`
        })
    })
    res.send(result)
}

export const createUserItem = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId
    const name = req.body.name
    const categoryId = req.body.categoryId
    const categoryName = req.body.categoryName
    const lasts = req.body.lasts

    if (categoryId) {
        UserItem.create({
            name: name,
            userId: userId,
            userCategoryId: categoryId,
            lasts: lasts
        })
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log(err)
        })
    } else if (!categoryId && categoryName && categoryName !== '') {
        UserCategory.create({
            name: categoryName,
            userId: userId
        })
        .then(category => {
            UserItem.create({
                name: name,
                userId: userId,
                userCategoryId: category.get('id')
            })
            .then(result => {
                res.send(result)
            })
        })
        .catch(err => {
            console.log(err)
        })
    } else {
        UserItem.create({
            name: name,
            userId: userId,
            lasts: lasts,
            userCategoryId: null
        })
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log(err)
        })
    }
}
