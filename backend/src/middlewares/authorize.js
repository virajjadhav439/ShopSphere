const User = require("../models/User");
const ApiError = require("../utils/ApiError");

const authorize = (...roles) => {

    return async (req, res, next) => {

        const user = await User.findById(req.user.userId);

        if (!user) {
            return next(new ApiError(404, "User Not Found"));
        }

        if (!roles.includes(user.role)) {
            return next(
                new ApiError(
                    403,
                    "You are not authorized to perform this action"
                )
            );
        }

        next();
    };

};

module.exports = authorize;