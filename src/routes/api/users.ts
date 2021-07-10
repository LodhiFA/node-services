import express from 'express'
import { check, validationResult } from 'express-validator'
import gravatar from 'gravatar'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { User } from '../../models/users'
import config from 'config'

const userRoute = express.Router()

// @route   POST api/users
// @desc    Register users
// @access  Public
userRoute.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const { name, email, password } = req.body

    try {
        // Check if user exists      
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                errors: [{ 
                    msg: 'User already exists'
                }]
            })
        }

        // Get users gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        })

        // Encrypt password
        const salt = await bcrypt.genSalt(10)  // Number of runs
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        // Return jsonwebtoken
        const payload: Object = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtToken'), 
            { expiresIn: 360000 },
            (e, token) => {
                if (e) throw e
                res.json({ token })
            })

    } catch(e) {
        console.log(e.message)
        res.status(500).send('Server error')
    }
  }
)

export default userRoute
