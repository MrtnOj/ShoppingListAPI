import { Router } from 'express'
import List from '../models/list'
import { saveList, getUserLists, getListDetails, insertIntoList, deleteList } from '../controllers/list'


const router = Router()

router.get('/:userId', getUserLists)

router.get('/listdetails/:listId', getListDetails)

router.post('/add/:listId', insertIntoList)

router.delete('/delete/:listId', deleteList)

router.post('/', saveList)

export default router