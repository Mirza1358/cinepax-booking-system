import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: './config.env' });

async function testConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Atlas Connected Successfully');
        console.log('Database:', mongoose.connection.name);
        process.exit(0);
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

testConnection(); 