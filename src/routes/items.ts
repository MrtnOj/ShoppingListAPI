import { Router } from 'express'
import isAuth from '../middleware/is-auth'

import { 
    getItems,
    getUserItems,
    createUserItem,
    itemsBought,
    getSuggestions,
    deleteUserItem,
    editUserItem
} from '../controllers/items'

const router = Router()

router.get('/', getItems)

router.post('/:userId', isAuth, createUserItem)

router.delete('/:itemId', isAuth, deleteUserItem)

router.put('/:itemId', isAuth, editUserItem)

router.post('/bought/:userId', isAuth, itemsBought)

router.get('/suggestions/:userId', isAuth, getSuggestions)

router.get('/:userId', isAuth, getUserItems)

export default router