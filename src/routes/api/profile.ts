import { mongoose } from '@typegoose/typegoose';
import express from 'express';
import { check, validationResult } from 'express-validator';
import { authUser } from '../../middleware/auth';
import { Profile } from '../../models/profile';
import { User } from '../../models/users';

const profileRoute = express.Router();

// @route   GET api/profile/me
// @desc    Retrieve current user's profile
// @access  Private
profileRoute.get('/me', authUser, async (req: any, res: any) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    res.json(profile);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
});

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
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
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
      } = req.body;

      // Build profile object
      const profileFields: any = {};
      profileFields.user = req.user.id;

      if (company) profileFields.company = company;
      if (website) profileFields.website = website;
      if (location) profileFields.location = location;
      if (bio) profileFields.bio = bio;
      if (status) profileFields.status = status;
      if (githubusername) profileFields.githubusername = githubusername;
      
      if (skills) {
          profileFields.skills = skills
            .split(',')
            .map((skill: string) => skill.trim());
      }

      // Build social object
      profileFields.social = {};

      if (youtube) profileFields.social.youtube = youtube;
      if (facebook) profileFields.social.facebook = facebook;
      if (twitter) profileFields.social.twitter = twitter;
      if (linkedin) profileFields.social.linkedin = linkedin;
      if (instagram) profileFields.social.instagram = instagram;

      try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            // Update
            profile = await Profile.findOneAndUpdate(
              { user: req.user.id },
              { $set: profileFields },
              { new: true }
            );
            return res.json(profile);
        }

        // Create 
        profile = new Profile(profileFields);

        await profile.save(); 
        res.json(profile);
      } catch (e) {
          console.error(e.message);
          res.status(500).send('Server Error');
      }
  }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
profileRoute.get('/', async (req: any, res: any) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (e) {
    console.error(e.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
profileRoute.get('/user/:user_id', async (req: any, res: any) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile)
      return res.status(400).json('Profile not found');
    
    res.json(profile);
  } catch (e) {
    console.error(e.message);
    if (e.kind == 'ObjectId') 
      return res.status(400).json('Profile not found');
    
    res.status(500).send('Server Error');
  }
});

export default profileRoute;
