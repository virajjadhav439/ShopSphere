const { registerUser, loginUser, getProfile } = require("../services/authServices");
const asyncHandler = require("../utils/asyncHandler")

const signup = asyncHandler(async (req,res)=>{
        const user = await registerUser(req.body);

    //Send Success Confirmation
    return res.status(201).json({
        message:"Signup Succesful",user
    })

})

const login = asyncHandler(async (req,res)=>{

        // Login the user
        const {token,user} = await loginUser(req.body)

    // Login Success Confirmation
    return res.status(200).json({
        message:"Login Successful",token,user
    })

    })


const profile = asyncHandler(async (req,res)=>{

        const user =await getProfile(req.user.userId)

        return res.status(200).json({
            user
        })

})

module.exports = {
    signup,
    login,
    profile,
}