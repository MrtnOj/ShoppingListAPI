import { Router } from 'express'
import isAuth from '../middleware/is-auth'

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

router.get('/:userId', isAuth, getUserCategories)

router.post('/', isAuth, createCategory)

router.post('/:userId', isAuth, createUserCategory)

router.put('/:categoryId', isAuth, editUserCategory)

router.delete('/:categoryId', isAuth, deleteUserCategory)

export default router