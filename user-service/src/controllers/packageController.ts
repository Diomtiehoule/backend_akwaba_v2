import { Router } from "express";
import packageService from "../services/packageService";

const packageRoute = Router()

packageRoute.get('/getAllPackage' , packageService.getAllPackage);
packageRoute.get("/getPackage/:id" , packageService.getPackage);

export default packageRoute;