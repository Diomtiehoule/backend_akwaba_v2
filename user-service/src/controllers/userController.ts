import userService from "../services/userService";
import { Router } from "express";
import auth from "../middlewares/authMiddleware";

const userRoute = Router()

userRoute.post('/create' , userService.createUser);
userRoute.post('/login' , userService.loginUser);
userRoute.get('/all' ,auth, userService.getUser);


export default userRoute;