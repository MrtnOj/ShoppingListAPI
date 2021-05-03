import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.get('Authorization')?.split(' ')[1]
    let decodedToken: any
    try {
        decodedToken = jwt.verify(token!, 'Theguywasaninteriordecorator,killed16czechoslovakians')
    } catch (err) {
        err.statusCode = 403
        throw err
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated')
        throw error
    }

    req.userId = decodedToken.userId
    next()
}

export default isAuth