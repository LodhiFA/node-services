import jwt from 'jsonwebtoken'
import config from 'config'

export const authUser = (req: any, res: any, next: any): any => {
    // Get token from header
    const token = req.header('x-auth-token')

    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' })
    }

    // Verify token
    try {
        const decoded: any = jwt.verify(token, config.get('jwtToken'))

        req.user = decoded.user
        next()
    } catch(e) {
        res.status(401).json({ msg: 'Token is not valid' })
    }
}