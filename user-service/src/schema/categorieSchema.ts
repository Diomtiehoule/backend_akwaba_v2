import { z } from 'zod';

 export const createCategorieSchema = z.object({
    nom: z.string().min(1 ,"Le nom de la categorie est requis"),
    description: z.string().min(1 , "La description de la categorie est requise")
});

export const updateCategorieSchema = z.object({
    nom: z.string().min(1 ,"Le nom de la categorie est requis"),
    description: z.string().min(1 , "La description de la categorie est requise")
});