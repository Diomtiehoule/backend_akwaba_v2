import { z } from 'zod';

 export const createLignProgrammeSchema = z.object({
    libelle: z.string().min(1 ,"Le libelle  de la ligne de programme est requis"),
    description: z.string().min(1 , "La description est requise"),
    dateDebut: z.string().min(1,"Le lieu et requis"),
    dateFin: z.string().min(1, "Ladate de debut est requie"),
    heureDebut: z.string().min(1, "L'heure de debut est requise"),
    heureFin: z.string().min(1, "L'heure de fin est requise"),
    programme: z.string().min(1,"Le programme associé est requis")
});

export const updateLignProgrammeSchema = z.object({
    libelle: z.string().min(1 ,"Le libelle  de la ligne de programme est requis"),
    description: z.string().min(1 , "La description est requise"),
    dateDebut: z.string().min(1,"Le lieu et requis"),
    dateFin: z.string().min(1, "Ladate de debut est requie"),
    heureDebut: z.string().min(1, "L'heure de debut est requise"),
    heureFin: z.string().min(1, "L'heure de fin est requise"),
    programme: z.string().min(1,"Le programme associé est requis")
});