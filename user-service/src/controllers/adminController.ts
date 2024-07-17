import AdminService from "../services/adminService";
import { Router } from "express";

const adminRoute = Router()

adminRoute.post('/create' , AdminService.create);
adminRoute.post('/login' , AdminService.loginAdmin)


export default adminRoute;