import {Router} from 'express';
import ticketService from "../services/ticketService";
import { generateTicketSchema , updateTicketSchema } from '../schema/ticketSchema';
import validateSchema from '../middlewares/validatorMiddleware';
import auth from '../middlewares/authMiddleware';

const ticketRoute = Router()

ticketRoute.post('/generateTicket' , auth , validateSchema(generateTicketSchema)  , ticketService.createTicket)

export default ticketRoute;