import express from 'express';
import { authUser } from '../../middleware/auth';
import { check, validationResult } from 'express-validator';
import { User } from '../../models/users';
import { Post } from '../../models/posts';
import { Profile } from '../../models/profile';

const postsRoute = express.Router();

// @route   POST api/posts
// @desc    Create a post
// @access  Private
postsRoute.post(
  '/',
  authUser,
  [
      check('text', 'Text is required')
        .not()
        .isEmpty()],
    async (req: any, res: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post({
                text: req.body.text,
                name: user?.name,
                avatar: user?.avatar,
                user: req.user.id
            });

            const post = await newPost.save();

            res.json(post);
        } catch (e) {
            console.error(e.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
postsRoute.get('/', authUser, async (req: any, res: any) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private
postsRoute.get('/:id', authUser, async (req: any, res: any) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (e) {
        console.error(e.message);
        if (e.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
postsRoute.delete('/:id', authUser, async (req: any, res: any) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Check user
        if (post?.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await post.remove();
        res.json({ msg: 'Post removed' });
    } catch (e) {
        console.error(e.message);
        if (e.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(500).send('Server Error');
    }
});

export default postsRoute;
