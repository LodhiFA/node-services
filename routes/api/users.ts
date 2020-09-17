import express from 'express';

const userRoute = express.Router();

// @route   GET api/users
// @desc    Retrieve list of users
// @access  Public
userRoute.get('/', (req: any, res: any) => res.send('User Route'));

export default userRoute;