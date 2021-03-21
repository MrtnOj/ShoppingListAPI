import { Router } from 'express'
import List from '../models/list'
import { saveList } from '../controllers/list'


const router = Router()

router.post('/', saveList)

export default router