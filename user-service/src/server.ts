import express , { response , request , application , NextFunction, Application} from "express";
import userRoute from "./controllers/userController";
import { globalError } from "./middlewares/errorMiddleware";
import { ApiError } from "./utils/apiError";
import path from "node:path";
import morgan from "morgan"
import cors from "cors"
import dotenv from "dotenv"
import adminRoute from "./controllers/adminController";
import typeRoute from "./controllers/typeController";
import eventRoute from "./controllers/eventController";
import categorieRoute from "./controllers/categorieController";
import sousCategorieRoute from "./controllers/sousCategorie";
import tarifEventRoute from "./controllers/tarifEventController";
import adresseRoute from "./controllers/adresseController";
import programmeRoute from "./controllers/programmeController";

dotenv.config({
    path: '.env'
})

const PORT = process.env.PORT || 5000

const app: Application = express();

// default middleware 

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'uploads')))
if(process.env.NODE_ENV === 'developpement') app.use(morgan("dev"));

// router
app.use('/user' , userRoute);
app.use('/admin' , adminRoute);
app.use('/type' , typeRoute);
app.use('/event' , eventRoute);
app.use('/categorie', categorieRoute);
app.use('/sousCategorie' , sousCategorieRoute);
app.use('/tarifEvent' , tarifEventRoute);
app.use('/adresse' , adresseRoute);
app.use('/programme' , programmeRoute);
app.all('*' , (req , _res , next) => {
    next(new ApiError(`can't find this route : ${req.originalUrl}`, 404))
})


// global error handing middleware 

app.use(globalError);
app.use(cors())

const server = app.listen(PORT , () =>{
    console.log(`server  running on port ${PORT}`)
})

// handle rejection outside express 

process.on('unhandledRejection' , (err) =>{
    console.log(`unhandledRejection Error ${err}`)
    server.close(()=>{
        console.log(`server down...`)
        process.exit(1)
    })
})

// routes
