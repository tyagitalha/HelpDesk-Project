import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.js"

export const isAdmin = async (req, res, next) => {
    // const user = User.findById(User._id)

    // if (user.role.enum !== "Admin") {
    //     throw new ApiError(404, "User not Admin")
    // }.

    try {

        if (req.user?.role !== "Admin") {
            throw new ApiError(404, "Access Denied , Admin Only")
        }
    } catch (error) {
        throw new ApiError(500, "Something Went Wrong")
    }
}