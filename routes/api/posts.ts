import express from 'express';

const postsRoute = express.Router();

// @route   GET api/posts
// @desc    Retrieve posts
// @access  Public
postsRoute.get('/', (req: any, res: any) => res.send('Posts Route'));

export default postsRoute;