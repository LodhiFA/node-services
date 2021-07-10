import express from 'express'
import { check, validationResult } from 'express-validator'
import { authUser } from '../../middleware/auth'
import request from 'request'
import config from 'config'
import { Profile } from '../../models/profile'
import { User } from '../../models/users'

const profileRoute = express.Router()

// @route   GET api/profile/me
// @desc    Retrieve current user's profile
// @access  Private
profileRoute.get('/me', authUser, async (req: any, res: any) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }
    res.json(profile)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Server Error')
  }
})

// @route   POST api/profile
// @desc    Create/Update user's profile
// @access  Private
profileRoute.post(
  '/',
  authUser,
  [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty(),
  ],
  async (req: any, res: any) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() })
      }

      const {
          company,
          website,
          location,
          bio,
          status,
          githubusername,
          skills,
          youtube,
          facebook,
          twitter,
          linkedin,
          instagram
      } = req.body

      // Build profile object
      const profileFields: any = {}
      profileFields.user = req.user.id

      if (company) profileFields.company = company
      if (website) profileFields.website = website
      if (location) profileFields.location = location
      if (bio) profileFields.bio = bio
      if (status) profileFields.status = status
      if (githubusername) profileFields.githubusername = githubusername
      
      if (skills) {
          profileFields.skills = skills
            .split(',')
            .map((skill: string) => skill.trim())
      }

      // Build social object
      profileFields.social = {}

      if (youtube) profileFields.social.youtube = youtube
      if (facebook) profileFields.social.facebook = facebook
      if (twitter) profileFields.social.twitter = twitter
      if (linkedin) profileFields.social.linkedin = linkedin
      if (instagram) profileFields.social.instagram = instagram

      try {
        let profile = await Profile.findOne({ user: req.user.id })

        if (profile) {
            // Update
            profile = await Profile.findOneAndUpdate(
              { user: req.user.id },
              { $set: profileFields },
              { new: true }
            )
            return res.json(profile)
        }

        // Create 
        profile = new Profile(profileFields)

        await profile.save() 
        res.json(profile)
      } catch (e) {
          console.error(e.message)
          res.status(500).send('Server Error')
      }
  }
)

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
profileRoute.get('/', async (req: any, res: any) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    res.json(profiles)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Server Error')
  }
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
profileRoute.get('/user/:user_id', async (req: any, res: any) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar'])

    if (!profile)
      return res.status(400).json('Profile not found')
    
    res.json(profile)
  } catch (e) {
    console.error(e.message)
    if (e.kind == 'ObjectId') 
      return res.status(400).json('Profile not found')
    
    res.status(500).send('Server Error')
  }
})

// @route   DELETE api/profile
// @desc    Delete profile, user & post
// @access  Private
profileRoute.delete('/', authUser, async (req: any, res: any) => {
  try {
    // TODO - Remove user's posts

    // Remove profile
    await Profile.findOneAndRemove({
      user: req.user.id,
    })

    // Remove user
    await User.findOneAndRemove({
      _id: req.user.id,
    })

    res.json({ msh: 'User Removed' })
  } catch (e) {
    console.error(e.message)
    if (e.kind == 'ObjectId') 
      return res.status(400).json('Profile not found')
    
    res.status(500).send('Server Error')
  }
})

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
profileRoute.put(
  '/experience',
  authUser,
  [
    check('title', 'Title is required')
      .not()
      .isEmpty(), 
    check('company', 'Company is required')
      .not()
      .isEmpty(),
    check('from', 'From date is required')      
      .not()
      .isEmpty()
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    }

    try {
      const profile = await Profile.findOne({
        user: req.user.id
      })

      if (!profile)
        return res.status(400).json('Profile not found')
      
      profile.experience.unshift(newExp)
      await profile.save()
      res.json(profile)
    } catch (e) {
      console.error(e.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
profileRoute.delete('/experience/:exp_id', authUser, async (req: any, res: any) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    // Get remove index
    const removeIndex: number = profile?.experience.map((item: any) => item.id).indexOf(req.params.exp_id) ?? 0
    profile?.experience.splice(removeIndex, 1)
    await profile?.save()
    res.json(profile)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Server Error')
  }
})



// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
profileRoute.put(
  '/education',
  authUser,
  [
    check('school', 'School is required')
      .not()
      .isEmpty(), 
    check('degree', 'Degree is required')
      .not()
      .isEmpty(), 
    check('fieldofstudy', 'Field of Study is required')
      .not()
      .isEmpty(),
    check('from', 'From date is required')      
      .not()
      .isEmpty()
  ],
  async (req: any, res: any) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    }

    try {
      const profile = await Profile.findOne({
        user: req.user.id
      })

      if (!profile)
        return res.status(400).json('Profile not found')
      
      profile.education.unshift(newEdu)
      await profile.save()
      res.json(profile)
    } catch (e) {
      console.error(e.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
profileRoute.delete('/education/:edu_id', authUser, async (req: any, res: any) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })

    // Get remove index
    const removeIndex: number = profile?.education.map((item: any) => item.id).indexOf(req.params.edu_id) ?? 0
    profile?.education.splice(removeIndex, 1)
    await profile?.save()
    res.json(profile)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Server Error')
  }
})

// @route   GET api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public
profileRoute.get('/github/:username', async (req: any, res: any) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&
      sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=
      ${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    }

    request(options, (error, response, body) => {
      if (error) console.error(error)

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' })
      }

      res.json(JSON.parse(body))
    })
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Server Error')
  }
})

export default profileRoute
