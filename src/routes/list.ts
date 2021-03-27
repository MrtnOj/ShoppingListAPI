import { Router } from 'express'
import List from '../models/list'
import { saveList, getUserLists, getListDetails, insertIntoList } from '../controllers/list'


const router = Router()

router.get('/:userId', getUserLists)

router.get('/listdetails/:listId', getListDetails)

router.post('/add/:listId', insertIntoList)

router.post('/', saveList)

export default router