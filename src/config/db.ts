import mongoose from 'mongoose';
import User, { IUser } from '../models/Users';
export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI)
        const url = `${connection.host}:${connection.port}/${connection.name}`
       // console.log(`DB is connected to ${url}`);
    } catch (error) {
        console.log(error);
    }
}