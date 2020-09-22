import express from 'express';
import { authUser } from '../../middleware/auth';
import { User } from '../../models/users'; 

const authRoute = express.Router();

// @route   GET api/auth
// @desc    Retrieve auth
// @access  Public
authRoute.get('/', authUser, async (req: any, res: any) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

export default authRoute;