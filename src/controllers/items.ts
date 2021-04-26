import { ItemInterface } from '../models/item'
import { UserItemAttributes } from '../models/userItem'
import Item from '../models/item'
import { Request, Response, NextFunction } from 'express'
import UserItem from '../models/userItem'
import suggestionsCalculator from '../util/suggestionsCalculator'
import ItemBought from '../models/itemBought'
import UserCategory from '../models/userCategory'

export interface BuyHistory {
    item: UserItemAttributes,
    boughtDates: Date[]
}

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

export const getSuggestions = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId
    let itemBuyHistory: BuyHistory[] = []
    UserItem.findAll({ where: {userId: userId}})
    .then(items => {
        items.forEach(item => {
            ItemBought.findAll({
                limit: 5,
                where: {
                    userItemId: item.id
                },
                order: [ ['bought', 'DESC']]
            })
            .then(boughtData => {
                if (boughtData) {
                    const buyDates = boughtData.map(data => data.bought)
                    itemBuyHistory.push({item: item, boughtDates: buyDates})
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
        const filteredBuyHistory = itemBuyHistory.filter(item => item.boughtDates.length > 1)
        const suggestions = suggestionsCalculator(filteredBuyHistory)
        res.json(suggestions)
    }, 2000)

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
    res.send(result)
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

export const deleteUserItem = (req: Request, res: Response, next: NextFunction) => {
    const itemId: number = parseInt(req.params.itemId)
    UserItem.destroy({ where: { id: itemId }})
    .then(response => {
        res.json(response)
    })
    .catch(err => {
        console.log(err)
    })
}
