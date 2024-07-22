import adresseService from "../services/adresseService";
import auth from "../middlewares/authMiddleware";
import { Router } from "express";

const adresseRoute = Router()

adresseRoute.post('/createAdresse' , auth , adresseService.createAdresse);
adresseRoute.get('/getAdresse' , adresseService.getAdresse);
adresseRoute.get('/getAllAdresse' , adresseService.getAllAdresse);
adresseRoute.put('/editAdresse' , auth , adresseService.editAdresse);
adresseRoute.delete('/deleteAdresse' , auth , adresseService.deleteAdresse);

export default adresseRoute;