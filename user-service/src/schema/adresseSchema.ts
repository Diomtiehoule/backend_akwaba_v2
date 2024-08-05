import { z } from 'zod';

 export const createAdresseSchema = z.object({
    adresse: z.string().min(1 ,"L'adresse de l'évènement est requis"),
    longitude: z.number().min(1 , "La longitude est requise"),
    largitude: z.number().min(1,"La largitude est requise"),
    evenement: z.string().min(1, "L'évènement est requis")
});

export const updateAdresseSchema = z.object({
    adresse: z.string().min(1 ,"L'adresse de l'évènement est requis"),
    longitude: z.number().min(1 , "La longitude est requise"),
    largitude: z.number().min(1,"La largitude est requise"),
    evenement: z.string().min(1, "L'évènement est requis")
});
