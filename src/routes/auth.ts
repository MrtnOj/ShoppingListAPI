import express from 'express'
import { body } from 'express-validator'
import { Router } from 'express'

import { signUp, logIn } from '../controllers/auth'
import User from '../models/user'

const router = Router()

router.post('/signup', signUp)

export default router