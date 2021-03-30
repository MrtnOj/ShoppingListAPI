import { Router } from 'express'

import { getCategories, createCategory, getUserCategories, createUserCategory } from '../controllers/categories'

const router = Router()

router.get('/', getCategories)

router.get('/:userId', getUserCategories)

router.post('/', createCategory)

router.post('/:userId', createUserCategory)

export default router