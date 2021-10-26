import express from 'express'
import { check, validationResult } from 'express-validator'
import { authUser } from '../../middleware/auth'
import jwt from 'jsonwebtoken'
import config from 'config'
import bcrypt from 'bcryptjs'
import { User } from '../../models/users'

const authRoute = express.Router()

// @route   GET api/auth
// @desc    Retrieve auth
// @access  Public
authRoute.get('/', authUser, async (req: any, res: any) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (e: any) {
    console.error(e.message)
    res.status(500).send('Server Error')
  }
})

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
authRoute.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      })
    }

    const { email, password } = req.body

    try {
      // Check if user exists
      let user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid credentials',
            },
          ],
        })
      }

      // Verifying password
      const isMatched = await bcrypt.compare(password, user.password)

      if (!isMatched) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Invalid credentials',
            },
          ],
        })
      }

      // Return jsonwebtoken
      const payload: Object = {
        user: {
          id: user.id,
        },
      }

      jwt.sign(
        payload,
        config.get('jwtToken'),
        { expiresIn: 360000 },
        (e, token) => {
          if (e) throw e
          res.json({ token })
        }
      )
    } catch (e: any) {
      console.log(e.message)
      res.status(500).send('Server error')
    }
  }
)

export default authRoute