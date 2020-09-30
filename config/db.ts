import mongoose from 'mongoose';
import config from 'config';

const db: string = config.get('mongoURI');

export const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        });

        console.log('MongoDB Connected ....');
    } catch(e) {
        console.error(e.message);
        process.exit(1);
    }
};