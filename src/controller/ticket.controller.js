import mongoose, { Schema } from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js"
import { Ticket } from "../models/ticket.model.js";

const createTicket = asyncHandler(async (req, res) => {
    const { title, description, category, priority, status, createdBy } = req.body

    if (
        [title, description, category, priority, status, createdBy].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All field are required")
    }

    const ticket = await Ticket.create(
        {
            title,
            description,
            category,
            priority,
            status,
            createdBy: req.user?._id
        }
    )

    const createdTicket = await Ticket.findById(ticket._id)

    if (!createdTicket) {
        throw new ApiError(500, "something went wrong while creating a ticket ")
    }

    return res.status(200)
        .json(
            new ApiResponse(201, {}, "ticket created successFully")
        )
})

const getAllTicket = asyncHandler(async (req, res) => {

    const user = req.user?._id
    console.log("user", user);
    if (!user) {
        throw new ApiError(401, "User id not Access")
    }

    const ticketId = await Ticket.find(
        {
            createdBy: user._id
        }
    ).select("-createdAt -updatedAt")
    console.log("ticket", ticketId);

   

    return res.status(200)
        .json(
            new ApiResponse(200, {}, "Access ALL ticket")
        )


})


const getOneTicket = asyncHandler(async (req, res) => {


    const user = req.user?._id
    if (!user) {
        throw new ApiError(401, "user is invalid")
    }

    const filter = {
        createdBy: user
    };

    if (req.body.category) {
        filter.category = req.body.category;
    }
    if (req.body.priority) {
        filter.priority = req.body.priority
    }
    if (req.body.status) {
        filter.status = req.body.status
    }


    const ticket = await Ticket.find(filter)
        .sort({ createdAt: -1 });

    console.log("ticket", ticket);

    return res.status(200)
        .json(
            new ApiResponse(200, {}, "Access One ticket")
        )
})

const updateTicket = asyncHandler(async (req, res) => {
    const { title, description, priority, category } = req.body;

    const userId = req.user?._id;
    const { ticketId } = req.params;

    console.log("ticketId:", ticketId);
    console.log("userId:", userId);

    // Check ticket exists and belongs to current user
    const ticket = await Ticket.findOneAndUpdate(
        {
            _id: ticketId,
            createdBy: userId,
        },
        {
            $set: {
                title,
                description,
                priority,
                category,
            },
        },
        {
            returnDocument: "after",
            runValidators: true,
        }
    );

    if (!ticket) {
        throw new ApiError(404, "Ticket not found or you are not authorized to update this ticket");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                ticket,
                "Ticket updated successfully"
            )
        );
});

const daleteTicket = asyncHandler(async (req, res) => {
    //get ticket id and access user id from middleware
    //use $set and undefined refreshToken 
    //and httpOnly and secure are true

    const userId = req.user?._id
    const { ticketId } = req.params


    console.log("userId", userId);
    console.log("ticketId", ticketId);

    const ticket = await Ticket.findOneAndDelete(
        {
            _id: ticketId,
            createdBy: userId
        }
    )

    if(!ticket){
        throw new ApiError(404,"Ticket not found")
    }
    console.log("ticket", ticket);
    return res.status(200)
    .json(new ApiResponse(200,{},"Ticket Delete SuccessFull"))

})

export { createTicket, getAllTicket, getOneTicket, updateTicket, daleteTicket }