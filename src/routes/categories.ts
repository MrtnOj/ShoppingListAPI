import { Router } from 'express'

import { 
    getCategories,
    createCategory,
    getUserCategories,
    createUserCategory,
    deleteUserCategory, 
    editUserCategory
} from '../controllers/categories'

const router = Router()

router.get('/', getCategories)

router.get('/:userId', getUserCategories)

router.post('/', createCategory)

router.post('/:userId', createUserCategory)

router.put('/:categoryId', editUserCategory)

router.delete('/:categoryId', deleteUserCategory)

export default router