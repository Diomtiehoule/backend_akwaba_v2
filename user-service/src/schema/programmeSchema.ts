import { z } from 'zod';

 export const createProgrammeSchema = z.object({
    programme: z.string().min(1 , "Le programme est requis"),
    evenement: z.string().min(1 , "L'évènement associé au programme est requis")
});

export const updateProgrammeSchema = z.object({
    programme: z.string().min(1 , "Le programme d'évènement est requis"),
    evenement: z.string().min(1 , "L'évènement associé au programme est requis")
});