import express from 'express';
import { connectDB } from '../config/db';
import userRoute from './routes/api/users';
import authRoute from './routes/api/auth';
import profileRoute from './routes/api/profile';
import postsRoute from './routes/api/posts';

const app = express(); 

connectDB();

// Init Middleware
app.use(express.json());

app.get('/', (req: any, res: any) => res.send('API Running'));

// Define Routes
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);
app.use('/api/posts', postsRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on por ${PORT}`);
});