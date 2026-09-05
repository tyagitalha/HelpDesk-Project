import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Ticket } from "../models/ticket.model.js"


const allTicket = asyncHandler(async (req, res) => {
    const ticket = await Ticket.find()
    console.log("ticket", ticket);

    console.log("this is working");
    if (!ticket) {
        throw new ApiError(404, "not access all ticket")
    }

    return res.status(200)
        .json(
            new ApiResponse(200, {Tickets : ticket}, "Get All Ticket")
        )
})


const oneticket = asyncHandler(async (req, res) => {
    const { ticketId } = req.params
    console.log("ticketId", ticketId);

    const ticket = await Ticket.find(
        {
            _id: ticketId
        }
    )
    console.log("ticket", ticket);

    return res.status(200)
        .json(
            new ApiResponse(200, {Tickets : ticket}, "Get One Ticket")
        )
})

const updateStatus = asyncHandler(async (req, res) => {

    const { status } = req.body
    console.log("status", status);


    const { ticketId } = req.params

    const ticket = await Ticket.findOneAndUpdate(
        {
            _id: ticketId
        },
        {
            $set: {
                status
            }
        },
        {
            new: true
        }
    )

    if (!ticket) {
        throw new ApiError(400, "ticket is invalid")
    }

    return res.status(200)
        .json(
            new ApiResponse(
                200, {Tickets : ticket}, "status chamge success fully"
            )
        )
})

const updatePriority = asyncHandler(async (req, res) => {
    const { priority } = req.body

    const { ticketId } = req.params

    const ticket = await Ticket.findOneAndUpdate(
        {
            _id: ticketId
        },
        {
            $set: {
                priority
            }
        },
        {
            new: true
        }
    )

    console.log("ticket", ticket)

    if (!ticket) {
        throw new ApiError(400, "ticket are invalid ")
    }

    return res.status(200)
        .json(
            new ApiResponse(200, {Tickets : ticket}, "priority update success full")
        )
})

const assignTicket = asyncHandler(async (req, res) => {

    const { ticketId } = req.params
    const userId = req.user?._id

    console.log("ticketId", ticketId);
    console.log("user", userId);

    const ticket = await Ticket.findOneAndUpdate(
        {
            _id: ticketId
        }, {
        $set: {
            assignTo: userId._id
        }
    },
        {
            new: true

        }
    )

    console.log("ticket", ticket)

    if (!ticket) {
        throw new ApiError(400, "ticket are invalid ")
    }

    return res.status(200)
        .json(
            new ApiResponse(200, {Tickets : ticket}, "Assigne Ticket  success full")
        )
})



export { allTicket, oneticket, updateStatus, updatePriority, assignTicket }