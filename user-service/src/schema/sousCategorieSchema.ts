import { z } from 'zod';

 export const createSousCategorieSchema = z.object({
    nom: z.string().min(1 ,"Le nom de la sous-categorie est requis"),
    description: z.string().min(1 , "La description de la sous-categorie est requise"),
    categorieEvent: z.string().min(1, "La categorie associé a la sous-categorie est requise")
});

export const updateSousCategorieSchema = z.object({
    nom: z.string().min(1 ,"Le nom de la sous-categorie est requis"),
    description: z.string().min(1 , "La description de la sous-categorie est requise"),
    categorieEvent: z.string().min(1, "La categorie associé a la sous-categorie est requise")
});