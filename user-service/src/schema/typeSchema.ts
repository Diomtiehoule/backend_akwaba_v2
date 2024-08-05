import { z } from 'zod';

 export const createTypeSchema = z.object({
    typeEvent: z.string().min(1 ,"Le type d'évènement est requis"),
    description: z.string().min(1 , "La description est requise")
});

export const updateTypeSchema = z.object({
    typeEvent: z.string().min(1, "Le type d'évènement est requis"),
    decription: z.string().min(1,"La description est requise")
});