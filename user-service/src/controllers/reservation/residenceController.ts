import {Router} from 'express';
import ResidenceService from '../../services/reservation/residenceService';

const residenceRoute = Router();

residenceRoute.get('/getall' , ResidenceService.getResidence)

export default residenceRoute