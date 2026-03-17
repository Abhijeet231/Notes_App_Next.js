import mongoose from "mongoose";

let isConnected = false;

async function dbConnect() {
    if(isConnected) {
        console.log('Mongodb is already connected');
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = db.connection[0].readyState === 1
        console.log("Connected To DB", db)
    } catch (error) {
        console.error("Failed to Connect with DB", error);
        throw error
    }
};

export default dbConnect;