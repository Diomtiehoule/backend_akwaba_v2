import { z } from 'zod';

 export const createEventSchema = z.object({
    nom: z.string().min(1 ,"Le type d'évènement est requis"),
    description: z.string().min(1 , "La description est requise"),
    lieu: z.string().min(1,"Le lieu et requis"),
    dateDebut: z.string().min(1, "Ladate de debut est requie"),
    dateFin: z.string().min(1, "Ladate de fin est requie"),
    typeEvent: z.string().min(1, "Le type d'évènement est requis"),
});

export const updateEventSchema = z.object({
    nom: z.string().min(1 ,"Le type d'évènement est requis"),
    description: z.string().min(1 , "La description est requise"),
    lieu: z.string().min(1,"Le lieu et requis"),
    dateDebut: z.string().min(1, "Ladate de debut est requie"),
    dateFin: z.string().min(1, "Ladate de fin est requie"),
    typeEvent: z.string().min(1, "Le type d'évènement est requis"),
});