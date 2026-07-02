const express = require('express');

const connectDB = require('./config/db');
const app = require('./app');
require('dotenv').config()

const PORT = process.env.PORT || 3000


const startServer = async () =>{
    try {
        await connectDB()
        app.listen(PORT,()=>{
    console.log(`The Server is Connected on ${PORT}`);
})
    } catch (error) {
        console.log("Server Failed to Start");
        console.log(error.message);
        
    }
}
startServer()