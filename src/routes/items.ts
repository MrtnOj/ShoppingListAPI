import { Router } from 'express'

import { getItems, getUserItems, createUserItem, itemsBought } from '../controllers/items'

const router = Router()

router.get('/', getItems)

router.post('/:userId', createUserItem)

router.put('/bought', itemsBought)

router.get('/:userId', getUserItems)

export default router