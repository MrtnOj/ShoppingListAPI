import { ItemInterface } from '../models/item'
import Item from '../models/item'
import { Request, Response, NextFunction } from 'express'
import UserItem from '../models/userItem'
import Category from '../models/category'
import ItemBought from '../models/itemBought'
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
    const userId = req.body.userId
    const date = new Date()
    let result = 'Bought dates updated'
    items.forEach((item: ItemInterface) => {
        ItemBought.create({
            userId: userId,
            userItemId: item.id,
            bought: date
        })
        .then(result => {
            console.log(`Item bought ID: ${item.id}`)
        })
        .catch(err => {
            console.log(err)
            result= `Updating failed for item with id ${item.id}`
        })
    })
    // items.forEach((item: ItemInterface) => {
    //     UserItem.update({ lastBought: date }, { where: { id: item.id } })
    //     .then(result => {
    //         console.log(`Updated successfully item id: ${item.id}`)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         result = `Updating failed for item with id ${item.id}`
    //     })
    // })
    res.send(result)
}

export const getSuggestions = (req: Request, res: Response, next: NextFunction) => {
    interface BuyHistory {
        id: number,
        boughtDates: Date[]
    }
    const userId = req.body.userId
    const date = new Date()
    let itemBuyHistory: BuyHistory[] = []
    UserItem.findAll({ where: {userId: userId}})
    .then(items => {
        items.forEach(item => {
            ItemBought.findAll({
                // limit: 5,
                where: {
                    userItemId: item.id
                },
                order: [ ['bought', 'DESC']]
            })
            .then(boughtData => {
                if (boughtData) {
                    const buyDates = boughtData.map(data => data.bought)
                    console.log(buyDates)
                    itemBuyHistory.push({id: item.id, boughtDates: buyDates})
                }
            })
            .catch(err => {
                console.log(err)
            })
        })
    })
    .catch(err => {
        console.log(err)
    })
    setTimeout(() => {
        res.json(itemBuyHistory)
    }, 3000)
}

export const createUserItem = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId
    const name = req.body.name
    const categoryId = req.body.category.id
    const categoryName = typeof(req.body.category === 'string') ? req.body.category : null
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
