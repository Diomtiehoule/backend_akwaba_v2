import EventService from "../services/eventService";
import auth from "../middlewares/authMiddleware";
import { Router } from "express";

const eventRoute = Router();

eventRoute.post('/createEvent' , auth , EventService.createEvent);
eventRoute.get('/getAllEvents' , auth , EventService.getAllEvents);
eventRoute.get('/getEvent' , auth , EventService.getEventById);
eventRoute.put('/editEvent' , auth , EventService.editEvent);
eventRoute.delete('/deleteEvent' , auth , EventService.deleteEvent);


export default eventRoute;