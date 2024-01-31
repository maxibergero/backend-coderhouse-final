import { Router } from "express";

import userRouter from "./users.routes.js"
import { passportError, authorization } from "../utils/messagesError.js";
import { generarTicket, getTickets, getTicketsById } from "../controllers/tickets.controller.js";

const ticketRouter = Router()

ticketRouter.post('/', passportError('jwt'), authorization(['Admin', 'User']), generarTicket)

ticketRouter.get('/', passportError('jwt'), authorization(['Admin', 'User']), getTickets)

ticketRouter.get('/:id', passportError('jwt'), authorization(['Admin', 'User']), getTicketsById)


export default ticketRouter