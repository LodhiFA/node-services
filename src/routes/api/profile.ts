import express from 'express';

const profileRoute = express.Router();

// @route   GET api/profile
// @desc    Retrieve profile
// @access  Public
profileRoute.get('/', (req: any, res: any) => res.send('Profile Route'));

export default profileRoute;