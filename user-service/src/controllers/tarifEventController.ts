import TarifEventService from "../services/tarifEventService";
import auth from "../middlewares/authMiddleware";
import { Router } from "express";

const tarifEventRoute = Router()

tarifEventRoute.post('/createTarif' , auth ,TarifEventService.createTarifEvent);
tarifEventRoute.get('/getTarifById' , TarifEventService.getTarifEventById);
tarifEventRoute.get('/getAllTarif' , TarifEventService.getAllTarifEvent);
tarifEventRoute.put('/editTarif' , auth , TarifEventService.editTarifEvent);
tarifEventRoute.delete('/deleteTarif' , auth , TarifEventService.deleteTarifEvent);

export default tarifEventRoute;