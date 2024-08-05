import prisma from "../utils/prisma.config";

const EventCategorieService = {
    createEventCategorie : async (req : any , res : any , next : any) => {
        try {
            const user = req.user
            if(user.role_id === 1) return res.status(401).json({message : "Action non-autorisé !"});
            const { evenement , categorie } = req.body;
            const isEvent = await prisma.event.findFirst({where :{nom : evenement}});
            if(!isEvent)return res.status(404).json({message : "Cet evenement n'existe pas !"});
            const isCategorie = await prisma.categorie.findFirst({where : {nom : categorie}});
            if(!isCategorie)return res.status(404).json({message : "Cette catégorie n'existe pas !"});
            const eventCategorieExist = await prisma.eventCategorie.findFirst({where : {evenement , categorie}})
            if(eventCategorieExist)return res.status(400).json({message : "Cette ligne eventCategorie existe déjà !"});
            const eventCategorie = await prisma.eventCategorie.create({data : {evenement : isEvent.nom , categorie : isCategorie.nom , eventId: isEvent.id , categorieId : isCategorie.id}});
            if(!eventCategorie)return res.status(400).json({message : "Echec de la création de la ligne categorie evenement !!"});
            res.status(201).json({message : "Ligne eventCategorie créé avec succès !"})

        } catch (error : any) {
            console.log(`Une erreur s'est produit lors du traitement !!! : ${error}`);
            res.status(500).json({message : "Une erreur s'est produit lors du traitement !!!"});
        }
    },
    getAllEventCategorie : async (req : any , res : any , next : any) =>{
        try {
            const allEventCattegorie = await prisma.eventCategorie.findMany()
            if(allEventCattegorie.length === 0)return res.status(404).json({message : "Aucune liste trouvée !"});
            const data = allEventCattegorie.map(event => {
                const info = {
                    id : event.id,
                    evenement : event.evenement,
                    categorie : event.categorie
                }
                return info;
            })
            res.status(200).json({message : "La liste de tout les lignes EventCategorie" , data});
        } catch (error : any) {
            console.log(`L'erreur : ${error}`);
            res.status(500).json({message : "Une  erreur s'est produite lors du traitement !!!"})
        }
    },
    getEventCategorie : async (req : any , res : any , next : any) => {
        try {
            const eventCategorieId = req.query.id;
            const isEventCategorie = await prisma.eventCategorie.findFirst({where : {id : Number(eventCategorieId)}})
            if(!isEventCategorie)return res.status(404).json({message : "Aucune ligne EventCCategorie trouvée !"});
            const data = { id: isEventCategorie.id , evenement : isEventCategorie.evenement , categorie : isEventCategorie.categorie };
            return res.status(200).json({message : "La ligne eventCategorie trouvée..." , data});
        } catch (error : any) {
            console.log(`L'erreur : ${error}`);
            res.status(500).json({message : "Une erreur s'est produite lors du traitement"})
        }
    },
    editEventCategorie : async (req : any , res : any , next : any) => {
        try {
            const user = req.user;
            if(user.role_id === 1)return res.status(401).json({message : "Acton non-autorisé"});
            const eventCategorieId = req.query.id;
            const isEventCategorie = await prisma.eventCategorie.findFirst({where : {id : Number(eventCategorieId)}});
            if(!isEventCategorie)return res.status(404).json({message : "Aucune ligne EventCategorie trouvée ! "})
            const {evenement , categorie} = req.body;
            const isEvent = await prisma.event.findFirst({where : {nom : evenement}})
            if(!isEvent)return res.status(404).json({message : "Cet evenement n'existe pas !"});
            const isCategorie = await prisma.categorie.findFirst({where : {nom : categorie}})
            if(!isCategorie)return res.status(404).json({message : "Cette categorie n'existe pas !"});
            const eventCategorieExiste = await prisma.eventCategorie.findFirst({where : {evenement , categorie}})
            if(eventCategorieExiste)return res.status(400).json({message : "Cette ligne EventCategorie existe deja !"});
            const  updateEventCategorie = await prisma.eventCategorie.update({where : {id : Number(eventCategorieId)} , data : {evenement , categorie}})
            return res.status(200).json({message : "Modifié avec succès !"})
        } catch (error : any) {
            console.log(`L'erreur : ${error}`);
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !!!"})
        }
    },
    deleteEventCategorie : async (req : any , res : any , next : any) => {
        try {
            const user = req.user;
            if(user.role_id === 1)return res.status(401).json({message :" Action non-autorisé !"});
            const eventCategorieId = req.query.id;
            const isEventCategorie = await prisma.eventCategorie.findFirst({where : {id: Number(eventCategorieId)}});
            if(!isEventCategorie)return res.status(404).json({message :"Aucune ligne categorie trouvée"});
            const deleteEventCategorie = await prisma.eventCategorie.delete({where : {id: Number(eventCategorieId)}});
            return res.status(200).json({message : "Supprimer avec succès !"});
        } catch (error : any) {
            console.log(`L'erreur : ${error}`);
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !!!"})
        }
    }
}

export default EventCategorieService