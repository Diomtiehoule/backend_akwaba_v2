import EventCategorieService from "../services/eventCategorie";
import auth from "../middlewares/authMiddleware";
import { Router } from "express";

const eventCategorieRoute = Router();

eventCategorieRoute.post('/createEventCategorie' ,auth, EventCategorieService.createEventCategorie);
eventCategorieRoute.get('/getAllEventCategorie' , EventCategorieService.getAllEventCategorie);
eventCategorieRoute.get('/getEventCategorie' , EventCategorieService.getEventCategorie);
eventCategorieRoute.put('/editEventCategorie' ,auth, EventCategorieService.editEventCategorie);
eventCategorieRoute.delete('/deleteEventCategorie' , auth , EventCategorieService.deleteEventCategorie);

export default eventCategorieRoute;