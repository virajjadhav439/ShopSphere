const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');

const findUserByEmail = async (email)=>{
    try {
        
        const user = await User.findOne({email})
        return user
    } catch (error) {
        throw error;
    }
}

const getProfile = async (userId)=>{
    try {
        const user = await User.findById(userId).select('-password')
        return user
    } catch (error) {
        throw error
    }
}

const registerUser = async ({name,email,password})=>{
    try {
    // Check if the user Exists we have to shift this to a service 
    const existingUser = await findUserByEmail(email)
    // if it exists
    if (existingUser) {
        throw new ApiError(409, "Email already exists");
    }
    // hash the pass before saving via bcrypt i think we should create a service for hashing -hashPassword()
    const hashedPassword = await bcrypt.hash(password,10)

    //Create user with the hashed password
    const createdUser = await User.create({
        name,email,password:hashedPassword,authProvider:"local"
    })

    const user = createdUser.toObject();
    delete user.password;
    return user;
    } catch (error) {
        throw error;
    }
}

const loginUser = async ({email,password})=>{
    try {
    //Check if the doesnt exists or not we will have to have the Check Existing User Service
    const existingUser = await findUserByEmail(email)

    if (!existingUser) {
        throw new ApiError(404, "Email not Registered");
    }

    //Compare the password here i think will have to make this a function in the auth services - this is comparepassword()
    // Check the result 
        const result = await bcrypt.compare(password,existingUser.password)
        //Show Result
        if (!result) {
            throw new ApiError(401, "Wrong Password");
        }

    //Create JWT token if the login is successful 
    const token = jwt.sign({
        userId:existingUser._id,
    },process.env.JWT_SECRET,{
        expiresIn:'7d',
    })

    const user = existingUser.toObject();
    delete user.password;
    return {token,user}
    } catch (error) {
        throw error;
    }
}


module.exports = {
    findUserByEmail,
    getProfile,
    registerUser,
    loginUser,
}