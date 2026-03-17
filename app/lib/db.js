import mongoose from "mongoose";

let isConnected = false;

const dbConnect = async() =>  {
    if(isConnected) {
        console.log('Mongodb is already connected');
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
                isConnected = db.connections[0].readyState === 1

        console.log("Connected To DB", db)
    } catch (error) {
        console.error("Failed to Connect with DB", error);
        throw error
    }
};

export default dbConnect;