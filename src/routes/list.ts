import { Router } from 'express'
import List from '../models/list'
import { saveList,
    getUserLists,
    getListDetails,
    insertIntoList,
    deleteList,
    removeListItem,
    changeListName,
    updateList
} from '../controllers/list'
import isAuth from '../middleware/is-auth'


const router = Router()

router.get('/:userId', isAuth, getUserLists)

router.get('/listdetails/:listId', isAuth, getListDetails)

router.post('/add/:listId', isAuth, insertIntoList)

router.delete('/listitem/delete/:listItemId', isAuth, removeListItem)

router.delete('/delete/:listId', isAuth, deleteList)

router.put('/update/', isAuth, updateList)

router.put('/:listId', isAuth, changeListName)

router.post('/', isAuth, saveList)

export default router