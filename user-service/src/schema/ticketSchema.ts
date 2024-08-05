import { z } from 'zod';

 export const generateTicketSchema = z.object({
    tarif: z.string().min(1 ,"Le tarif du ticket est requis"),
    nombre: z.number().min(1 , "Le nombre de ticket est requis"),
    dateEffet: z.number().min(1, "La date d'effet du ticket est requise"),
    dateExp: z.number().min(1, "La date d'expiration du ticket est requise")
});

export const updateTicketSchema = z.object({
    tarif: z.string().min(1 ,"Le tarif du ticket est requis"),
    nombre: z.number().min(1 , "Le nombre de ticket est requis"),
    dateEffet: z.number().min(1, "La date d'effet du ticket est requise"),
    dateExp: z.number().min(1, "La date d'expiration du ticket est requise")
});
