import express from 'express';

const authRoute = express.Router();

// @route   GET api/auth
// @desc    Retrieve auth
// @access  Public
authRoute.get('/', (req: any, res: any) => res.send('Auth Route'));

export default authRoute;