import prisma from "../utils/prisma.config";
import { PrismaClient } from "@prisma/client";

const lignProgrammeService = {
    createLignProgramme: async (req : any , res : any , next : any) => {
        try {
            const user = req.user
            if(user.role_id === 1) return res.status(401).json({message : "Action non-autorisé !"});
            const {libelle , description , dateDebut , dateFin , heureDebut , heureFin , programme} = req.body
            if(libelle =="" || description =="" || dateDebut =="" || dateFin =="" || heureDebut =="" || heureFin=="" || programme=="") return res.status(400).json({message : "Veuillez remplir tout les champs !"})
            const isProgramme = await prisma.programme.findFirst({where : {programme : programme}})
            if(!isProgramme)return res.status(400).json({message: "Ce chronogramme n'existe pas !"})
            const lignProgrammeExist = await prisma.lignProgramme.findFirst({where : {libelle , description , dateDebut , dateFin , heureDebut , heureFin ,programme}})
            if(lignProgrammeExist)return res.status(400).json({message : "Cette ligneChrono existe déjà !"})
            const newLignProgramme = await prisma.lignProgramme.create({data : {libelle , description , dateDebut, dateFin , heureDebut , heureFin , programme , programmeId : isProgramme.id}})
            if(newLignProgramme)return res.status(201).json({message : "LignProgramme créé !"})
        } catch (error : any) {
            console.log(`L'erreur : ${error}`)
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !"})
        }
    },
    getLignProgramme: async(req : any , res : any , next : any) => {
        try {
            const lignProgrammeId = req.query.id
            const isLignProgramme = await prisma.lignProgramme.findUnique({where : {id : Number(lignProgrammeId)}})
            if(!isLignProgramme) return res.status(400).json({message : "Aucune lignProgramme trouvée !"})
            const data = {
                id : isLignProgramme.id,
                libelle : isLignProgramme.libelle,
                description : isLignProgramme.description,
                dateDebut : isLignProgramme.dateDebut,
                dateFin : isLignProgramme.dateFin,
                heureDebut : isLignProgramme.heureDebut,
                heureFin : isLignProgramme.heureFin,
                programme : isLignProgramme.programme
            }
            return res.status(200).json({message : "la lignProgramme trouvée " , data});
        } catch (error : any) {
            console.log(`Lerreur : ${error}`)
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !"})
        }
    },
    getAllLignProgramme: async (req : any , res : any , next : any) => {
        try {
            const allLignProgramme = await prisma.lignProgramme.findMany()
            if(allLignProgramme.length ===0)return res.status(400).json({message : "La liste est vide !"})
            const data = allLignProgramme.map(lignProgramme => {
                    const info = {
                        id : lignProgramme.id,
                        libelle : lignProgramme.libelle,
                        description : lignProgramme.description,
                        dateDebut : lignProgramme.dateDebut,
                        dateFin : lignProgramme.dateFin,
                        heureDebut : lignProgramme.heureDebut,
                        heureFin : lignProgramme.heureFin,
                        programme : lignProgramme.programme
                    }
                    return info
            })
            return res.status(400).json({message : "La liste des lignProgramme enregistrée" , data})
        } catch (error : any) {
            console.log(`Lerreur : ${error}`)
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !"})
        }
    },
    editLignProgramme: async(req : any , res : any , next : any) => {
        try {
            const user = req.user
            if(user.role_id === 1) return res.status(401).json({message : "Action non-autorisé !"});
            const lignProgrammeId = req.query.id
            const lignProgrammeExist = await prisma.lignProgramme.findFirst({where : {id : Number(lignProgrammeId)}})
            if(!lignProgrammeExist)return res.status(400).json({message : "Cette lignProgramme n'existe pas !"})
            const {libelle , description , dateDebut , dateFin , heureDebut , heureFin , programme} = req.body
            if(libelle =="" || description =="" || dateDebut =="" || dateFin =="" || heureDebut =="" || heureFin=="" || programme=="") return res.status(400).json({message : "Veuillez remplir tout les champs !"})
            const isProgramme = await prisma.programme.findFirst({where : {programme : programme}})
            if(!isProgramme)return res.status(400).json({message : "Ce chronogramme n'existe pas"})
            const isLignProgramme = await prisma.lignProgramme.findFirst({where : {libelle , description , dateDebut , dateFin , heureDebut , heureFin , programme }});
            if(isLignProgramme)return res.status(400).json({message : "Cette lignProgramme existe déjà"});
            const updateLignProgramme = await prisma.lignProgramme.update({where : {id : Number(lignProgrammeId)}, data : {libelle , description , dateDebut , dateFin , heureDebut , heureFin , programme , programmeId : isProgramme.id}})
            if(updateLignProgramme)return res.status(200).json({message : "Mise à jours éffectuée !"})
        } catch (error : any) {
            console.log(`Lerreur : ${error}`)
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !"})
        }
    },
    deleteLignProgramme: async(req : any , res : any , next : any) => {
        try {
            const user = req.user
            if(user.role_id === 1) return res.status(401).json({message : "Action non-autorisé !"});
            const lignProgrammeId = req.query.id
            const lignProgrammeExist = await prisma.lignProgramme.findFirst({where : {id : Number(lignProgrammeId)}})
            if(!lignProgrammeExist)return res.status(400).json({message : "Cette lignProgramme n'existe pas !"})
            const deleteLignProgramme = await prisma.lignProgramme.delete({where : {id : Number(lignProgrammeId)}})
            if(deleteLignProgramme)return res.status(200).json({message: "Suppression éffectuée !"})
        } catch (error : any) {
            console.log(`L'erreur : ${error}`)
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !"})
        }
    }
}

export default lignProgrammeService;