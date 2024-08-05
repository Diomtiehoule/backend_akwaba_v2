import prisma from "../utils/prisma.config";

const SousCategorieService = {
    createSousCategorie: async (req : any , res : any , next : any) => {
        try {
            const user = req.user
            if(user.role_id === 1) return res.status(401).json({message : "Action non-autorisé !"})
            const {nom , description , categorieEvent} = req.body
            if(nom  == "" || description == "" || categorieEvent == "") return res.status(400).json({message : "Veuillez remplir tout les champs !"})
            const isCategorieEvent = await prisma.categorie.findFirst({where : {nom : categorieEvent}});
            if(!isCategorieEvent) return res.status(400).json({message : "Cette catégorie n'existe pas !"});
            const sousCategorieExist = await prisma.sousCategorie.findFirst({where : {nom , description , categorieEvent}})
            if(sousCategorieExist) return res.status(400).json({message : "Cette sous catégorie existe déjà"});
            const newSousCatégorie = await prisma.sousCategorie.create({data : {nom , description , categorieEvent , categorieId : isCategorieEvent.id}})
            if(newSousCatégorie)return res.status(201).json({message : "Sous catégorie créé avec succès !"})
        } catch (error : any) {
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !"});
        }
    },
    getSousCategorieById: async (req : any , res : any , next : any) => {
        const sousCategorieId = req.query.id
        const isSousCategorie = await prisma.sousCategorie.findFirst({where : {id : Number(sousCategorieId)}})
        if(!isSousCategorie) return res.status(400).json({message : "Cette sous catégorie n'existe pas !"})
        const data = {
            id : isSousCategorie.nom,
            nom : isSousCategorie.nom,
            description : isSousCategorie.description,
            categorieEvent : isSousCategorie.categorieEvent,
            }
        return res.status(200).json({message : "Sous catégorie trouvée avec succès" , data});
    },
    getAllSousCategorie: async (req : any , res : any , next : any) => {
        try {
            const allSousCategorie = await prisma.sousCategorie.findMany()
            if(allSousCategorie.length === 0) return res.status(400).json({message : "La liste des sous catégorie est vide..."});
            const data = allSousCategorie.map(sousCategorie => {
                const info = {
                    id : sousCategorie.id,
                    nom : sousCategorie.nom,
                    description : sousCategorie.description,
                    categorieEvent : sousCategorie.categorieEvent,
                }
                return info
            })
            return res.status(200).json({message : "La liste de tout les sous évènements !" , data})
        } catch (error : any) {
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !"})
        }
    },
    editSousCategorie: async (req : any , res : any , next : any) => {
        try {
            const user = req.user;
            const sousCategorieId = req.query.id
            if(user.role_id === 1) return res.status(401).json({message : "Action non-autorisé !"})
            const isSousCategorie = await prisma.sousCategorie.findFirst({where : {id : Number(sousCategorieId)} });
            if(!isSousCategorie) return res.status(400).json({message : "Cette sous catégorie n'existe pas !"});
            const {nom , description , categorieEvent} = req.body;
            if(nom  == "" || description == "" || categorieEvent == "") return res.status(400).json({message : "Veuillez remplir tout les champs !"});
            const isCategorieEvent = await prisma.categorie.findFirst({where : {nom : categorieEvent }})
            if(!isCategorieEvent) return res.status(400).json({message : "Cette catégorie n'existe pas !"})
            const sousCategorieExist = await prisma.sousCategorie.findFirst({where : {nom,description,categorieEvent}})
            if(sousCategorieExist) return res.status(400).json({message : "Cette sous catégorie existe déjà !"});
            const updateSousCategorie = await prisma.sousCategorie.update({where : {id : Number(sousCategorieId)} , data :{nom , description , categorieEvent , categorieId : isCategorieEvent.id}})
            if(updateSousCategorie) return res.status(200).json({message : "Mise à jours de la sous caégorie éffectuée avec succès !"})
        } catch (error : any) {
            console.log("l'erreur :" , error)
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !"})
        }
    },
    deleteSousCategorie: async (req : any , res : any , next : any) => {
        try {
            const user = req.user;
            const sousCategorieId = req.query.id
            if(user.role_id === 1) return res.status(401).json({message : "Action non-autorisée !"});
            const isSousCategorie = await prisma.sousCategorie.findFirst({where : {id : Number(sousCategorieId)}})
            if(!isSousCategorie) return res.status(400).json({message : "Cette sous catégorie n'existe pas !"})
            const deleteSousCategorie = await prisma.sousCategorie.delete({where : {id : Number(sousCategorieId)}})
            if(deleteSousCategorie) return res.status(200).json({message : "Sous catégorie supprimée avec succès !"})
        } catch (error : any) {
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !" , err:error.message})
        }
        
    }
}

export default SousCategorieService;