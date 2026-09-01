import { ApiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { User } from "../models/user.model.js"
import { Comment } from "../models/comment.model.js"

const createComment = asyncHandler(async (req, res) => {
    // access user id from auth 
    //access ticket from params
    // crate a comment and add comment 
    // and in author store user id , and in ticket add ticket id 

    const { message, author } = req.body

    const userId = req.user?._id
    const { ticketId } = req.params

    console.log("userId", userId);
    console.log("ticketId", ticketId);

    const comment = await Comment.create(
        {
            message,
            author: userId,
            ticket: ticketId

        }
    )



    console.log("comment", comment);

    const createdComment = await Comment.findById(comment._id)

    if (!createdComment) {
        throw new ApiError(500, "Something went Wrong")
    }

    return res.status(200)
        .json(new ApiResponse(200, {}, "Comment create SuccessFull"))

})

const getAllComment = asyncHandler(async (req, res) => {
    const ticket = await Comment.find()
    console.log("ticket", ticket)
    if (!ticket) {
        throw new ApiError(400, "ticket not find")
    }

    return res.status(200)
        .json(new ApiResponse(200, {}, "Get All Comments"))
})

export { createComment, getAllComment }