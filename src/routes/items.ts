import { Router } from 'express'

import { getItems, getUserItems, createUserItem } from '../controllers/items'

const router = Router()

router.get('/', getItems)

router.post('/:userId', createUserItem)

router.get('/:userId', getUserItems)

export default router