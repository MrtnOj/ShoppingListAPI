import { Router } from 'express'

import { getCategories, createCategory } from '../controllers/categories'

const router = Router()

router.get('/', getCategories)

router.post('/', createCategory)

export default router