import express from 'express'
import { authUser } from '../../middleware/auth'
import { check, validationResult } from 'express-validator'
import { User } from '../../models/users'
import { Post } from '../../models/posts'

const postsRoute = express.Router()

// @route   POST api/posts
// @desc    Create a post
// @access  Private
postsRoute.post(
  '/',
  authUser,
  [check('text', 'Text is required').not().isEmpty()],
  async (req: any, res: any) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password')

      const newPost = new Post({
        text: req.body.text,
        name: user?.name,
        avatar: user?.avatar,
        user: req.user.id,
      })

      const post = await newPost.save()

      res.json(post)
    } catch (e) {
      console.error(e.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
postsRoute.get('/', authUser, async (req: any, res: any) => {
  try {
    const posts = await Post.find().sort({ date: -1 })
    res.json(posts)
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Server Error')
  }
})

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private
postsRoute.get('/:id', authUser, async (req: any, res: any) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }
    res.json(post)
  } catch (e) {
    console.error(e.message)
    if (e.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }
    res.status(500).send('Server Error')
  }
})

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
postsRoute.delete('/:id', authUser, async (req: any, res: any) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' })
    }

    // Check user
    if (post?.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' })
    }

    await post.remove()
    res.json({ msg: 'Post removed' })
  } catch (e) {
    console.error(e.message)
    if (e.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' })
    }
    res.status(500).send('Server Error')
  }
})

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
postsRoute.put('/like/:id', authUser, async (req: any, res: any) => {
  try {
    const post = await Post.findById(req.params.id)

    // Check if post is already liked
    if (post) {
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length > 0
      ) {
        return res.status(400).json({ msg: 'Post already liked' })
      }

      post?.likes.unshift({ user: req.user.id })
      await post?.save()

      res.json(post?.likes)
    }
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Server Error')
  }
})

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
postsRoute.put('/unlike/:id', authUser, async (req: any, res: any) => {
  try {
    const post = await Post.findById(req.params.id)

    // Check if post is already liked
    if (post) {
      if (
        post.likes.filter((like) => like.user.toString() === req.user.id)
          .length === 0
      ) {
        return res.status(400).json({ msg: 'Post has not been liked' })
      }

      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id)
      post.likes.splice(removeIndex, 1)
      await post.save()

      res.json(post.likes)
    }
  } catch (e) {
    console.error(e.message)
    res.status(500).send('Server Error')
  }
})

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
postsRoute.post(
  '/comment/:id',
  authUser,
  [check('text', 'Text is required').not().isEmpty()],
  async (req: any, res: any) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const user = await User.findById(req.user.id).select('-password')
      const post = await Post.findById(req.params.id)

      const newComment: any = {
        text: req.body.text,
        name: user?.name,
        avatar: user?.avatar,
        user: req.user.id,
      }
      post?.comments.unshift(newComment)
      post?.save()
      res.json(post?.comments)
    } catch (e) {
      console.error(e.message)
      res.status(500).send('Server Error')
    }
  }
)

// @route   Delete api/posts/comment/:id/:comment_id
// @desc    Delete comment
// @access  Private
postsRoute.delete('/comment/:id/:comment_id', authUser, async(req: any, res: any) => {
    try {
        const post = await Post.findById(req.params.id)
        
        if (post) {
            // Find the comment in post
            const comment = post.comments.find(comment => (comment as any).id === req.params.comment_id)

            // If comment exists
            if (!comment) {
                return res.status(404).json({ msg: 'Comment does not exist' })
            }

            // Check user
            if (comment.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: 'User not authorized' })
            }
            
            const removeIndex = post.comments
                .map((comment) => comment.user.toString())
                .indexOf(req.user.id)
            post.comments.splice(removeIndex, 1)
            await post.save()

            res.json(post.comments)
        }
    } catch (e) {
        console.error(e.message)
        res.status(500).send('Server Error')
      }
})

export default postsRoute
