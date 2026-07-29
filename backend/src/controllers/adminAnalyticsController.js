const { getAdminAnalytics } = require("../services/adminAnalyticsServices");
const asyncHandler = require("../utils/asyncHandler");

const getAdminAnalyticsController = asyncHandler(async(req,res)=>{
    const analytics = await getAdminAnalytics()
    return res.status(200).json({
        success:true,
        ...analytics
    })
})

module.exports = getAdminAnalyticsController