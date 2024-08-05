import { z } from 'zod';

 export const createTypeTarifSchema = z.object({
    typeTarif: z.string().min(1 ,"Le type de tarif est requis"),
    prix: z.number().min(1 , "Le prix est requise"),
    event: z.string().min(1 , "L'evenement associé au tarif est requis")
});

export const updateTypeTarifSchema = z.object({
    typeTarif: z.string().min(1 ,"Le type de tarif est requis"),
    prix: z.number().min(1 , "Le prix est requise"),
    event: z.string().min(1 , "L'evenement associé au tarif est requis")
});