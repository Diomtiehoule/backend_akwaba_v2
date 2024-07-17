import TypeService from "../services/typeService";
import auth from "../middlewares/authMiddleware";
import { Router } from "express";

const typeRoute = Router()

typeRoute.post('/create' , auth, TypeService.createType);
typeRoute.get('/getType' , TypeService.getTypeById);
typeRoute.get('/getAllType' , TypeService.getAllType);
typeRoute.put('/edit' , auth , TypeService.editType);
typeRoute.delete('/delete' , auth , TypeService.deleteType);

export default typeRoute;
