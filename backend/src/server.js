const express = require('express');

require('dotenv').config()

const connectDB = require('./config/db');

const app = require('./app');

const PORT = process.env.PORT || 5000


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