const mongoose =require('mongoose');

async function connectDB(){
    const mongoUri = process.env.MONGODB_URI;
    try{
    await mongoose.connect(mongoUri);
    console.log('Connect to MongoDB successfully')
    }
    catch(error){
        console.log('error connect to mongoDB',error)
    }
}   
module.exports = connectDB;