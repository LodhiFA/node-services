import express from 'express';
import { connectDB } from '../config/db';

const app = express(); 

connectDB();

app.get('/', (_req: any, res: any) => res.send('API Running'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on por ${PORT}`);
});