import prisma from "../utils/prisma.config";

const EventService = {
    createEvent : async (req : any , res : any , next : any) => {
        try {
            const { userId } = req.auth
            const { nom , description , lieu , date , typeEvent} = req.body;
            const isAdmin = await prisma.admin.findFirst({where : {id : userId}})
            if(!isAdmin || isAdmin.role !== "administrateur") return res.status(401).json({message : "Accès non-autorisé !"})
            const eventExist = await prisma.event.findFirst({where : {nom , description , lieu , date}})
            if(eventExist)return res.status(400).json({message : "Ce évènement a déjà été enregistré"})
            const type = await prisma.type.findFirst({where : {typeEvent}})
            if(!type)return res.status(400).json({message : "Ce type d'évènement n'existe pas"});
            const newEvent = await prisma.event.create({data : {nom , description ,date , lieu, typeEvent , typeId : type.id}})
            const data = {
                nom : newEvent.nom,
                description : newEvent.description,
                lieu : newEvent.lieu,
                date : newEvent.date,
                typeEvent : newEvent.typeEvent,
            }
            return res.status(201).json({message : "Evènement créé avec succès !" , data});
        } catch (error : any) {
            console.log(`votre erreur : ${error}`)
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !!!"});
        }
    },
    getAllEvents : async (req : any , res : any , next : any) => {
        try {
            const allEvent = await prisma.event.findMany()
            if(allEvent.length === 0) return res.status(400).json({message : "Aucun évènement enregistré !"});
            const data = allEvent.map(event =>{
                const info = {
                    nom : event.nom,
                    description : event.description,
                    lieu : event.lieu,
                    date : event.date,
                    typeEvent : event.typeEvent,
                }
                return info;
            })
            return res.status(200).json({message : "Tous les évènements" , data})
        } catch (error) {
            console.log(`votre erreur : ${error}`)
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !!!"});
        }
    },
    getEventById : async (req : any , res : any , next : any) =>{
        try {
            const eventId = req.query.id;
            const event = await prisma.event.findUnique({where : {id : Number(eventId)}})
            if(!event)return  res.status(204).json({message :"Aucun évènement trouvé !"})
            const data = {
                nom : event.nom,
                description : event.description,
                lieu : event.lieu,
                date : event.date,
                typeEvent : event.typeEvent,
            }
            res.status(200).json({message : "l'évènement correspondant..." , data})
        } catch (error: any) {
            console.log(`votre erreur : ${error}`)
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !!!"});
        }
    },
    editEvent : async (req: any, res: any, next: any) => {
        try {
            const { userId } = req.auth;
            const eventId = req.query.id;
            console.log(eventId)
            const isAdmin = await prisma.admin.findFirst({ where: { id: userId } });
            if (!isAdmin || isAdmin.role !== 'administrateur') return res.status(401).json({ message: "Vous n'avez pas cette autorisation !!!" });
            const { nom , description , lieu , date , typeEvent } = req.body;
            const eventExist = await prisma.event.findFirst({ where: { id : Number(eventId) } });
            if(!eventExist) return res.status(400).json({message : "Aucun évènement trouvé !"})
            const eventUpdated = await prisma.event.update({where: { id : Number(eventId) },data: { nom , description ,lieu , date , typeEvent}});
            const isType = await prisma.type.findFirst({where : { typeEvent : typeEvent}})
            if(!isType)return res.status(400).json({message : "Ce type d'évènement n'existe pas"})
            if (!eventUpdated) return res.status(400).json({ message: "Échec de la mise à jour de l'évènement..." });
            res.status(200).json({ message: "Evènement mis à jour avec succès !!!" });
        } catch (error: any) {
            console.error('Erreur lors de la mise à jour du type :', error);
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !!!"});
        }
    },
    deleteEvent : async (req : any , res : any , next : any) => {
        try {
            const {userId} = req.auth;
            const eventId = req.query.id;
            const isAdmin = await prisma.admin.findFirst({where : {id : userId}});
            if(!isAdmin || isAdmin.role !== "administrateur") return res.status(401).json({message : "Accès non-autorisé !"});
            const eventExist = await prisma.event.findFirst({where : {id : Number(eventId)}});
            if(!eventExist) return res.status(400).json({message: "Aucun évènement trouvé !"});
            const eventDeleted = await prisma.event.delete({where : {id : Number(eventId)}});
            if(!eventDeleted) return res.status(400).json({message : "Echec de la suppression de l'évènement !"});
            return res.status(200).json({message : "Evènement supprimé avec succès !"})
        } catch (error) {
            console.error('Erreur lors de la mise à jour du type :', error);
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !!!"});
        }
    }
}

export default EventService;