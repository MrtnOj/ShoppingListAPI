import { Router } from 'express'

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

router.post('/:userId', createUserItem)

router.delete('/:itemId', deleteUserItem)

router.put('/:itemId', editUserItem)

router.post('/bought', itemsBought)

router.get('/suggestions/:userId', getSuggestions)

router.get('/:userId', getUserItems)

export default router