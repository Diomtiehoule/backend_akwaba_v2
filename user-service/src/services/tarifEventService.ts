import prisma from "../utils/prisma.config";

const TarifEventService = {
    createTarifEvent : async (req : any , res : any , next : any) =>{
        try{
            const user = req.user;
            if(user.role_id === 1)return res.status(400).json({message : "Action non-autorisée !"})
            const {typeTarif , prix , event} =req.body;
            if(typeTarif == "" || prix == 0 || event=="")return res.status(400).json({message : "Veuillez remplir tout les champs !"})
            const isEvent = await prisma.event.findFirst({where : {nom : event}})
        console.log(`l'evenement : ${isEvent}`)
            if(!isEvent) return res.status(400).json({message : "Cet évènement n'existe pas !"})
            const tarifEventExist = await prisma.tarifEvent.findFirst({where : {typeTarif , prix , event}})
            if(tarifEventExist)return res.status(400).json({message : "Cet tarif existe déjà"})
            const tarifEvent = await prisma.tarifEvent.create({data : {typeTarif , prix , event , eventId : isEvent.id}})
            if(tarifEvent) return res.status(201).json({message: "Cet tarif à été ajouté !"})
        }catch(error : any){
            console.log(`l'erreur : ${error}`)
            res.status(500).json({message : "Une erreur est survenue lors du traitement"});
        }
    },
    getTarifEventById : async (req : any , res : any , next : any) =>{
        try {
            const tarifId = req.query.id
            const isTarif = await prisma.tarifEvent.findFirst({where : {id :Number(tarifId)}})
            if(!isTarif)return res.status(400).json({message : "Cet tarif n'existe pas"})
            const data = {
                id : isTarif.id,
                typeTarif : isTarif.typeTarif,
                prix : isTarif.prix,
                event : isTarif.event
            }
            res.status(200).json({message : "Le tarif trouvé..." , data})
        } catch (error : any) {
            console.log(`l'erreur : ${error}`)
            res.status(500).json({message: "Une erreur s'est produite lors du traitement" , err: error.message})
        }
    },
    getAllTarifEvent : async (req : any , res : any , next : any) =>{
       try {
            const allTarif = await prisma.tarifEvent.findMany()
            if(allTarif.length === 0) return res.status(400).json({message : "La liste des tarifs est vide !"})
            const data = allTarif.map(tarif => {
                const info  = {
                    id : tarif.id,
                    typeTarif : tarif.typeTarif,
                    prix : tarif.prix,
                    event : tarif.event
                }
                return info
            })
            res.status(200).json({message : "La liste des tarifs..." , data})
       } catch (error : any) {
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !"})
       }
    },
    editTarifEvent : async (req : any , res : any , next : any) =>{
        try {
            const user = req.user;
            const tarifId = req.query.id
            if(user.role_id)return res.status(400).json({message : "Action non-autorisé !"});
            const isTarif = await prisma.tarifEvent.findFirst({where : {id : Number(tarifId)}});
            if(!isTarif) return res.status(400).json({message : "Cet tarif n'existe pas !"});
            const {typeTarif , prix , event} = req.body;
            if(typeTarif == "" || prix == "" || event == "") return res.status(400).json({message : "Veuillez remplir tout les champs !"})
            const tarifExist = await prisma.tarifEvent.findFirst({where : {typeTarif , prix , event}});
            if(tarifExist)return res.status(400).json({message : "Cet tarif existe déjà !"});
            const isEvent = await prisma.event.findFirst({where : {nom : event}});
            if(!isEvent)return res.status(400).json({message : "Cet évènement n'existe pas !"});
            const editTarif = await prisma.tarifEvent.update({where : {id : Number(tarifId)} ,  data : {typeTarif , prix , event , eventId : isEvent.id}});
            if(editTarif)return res.status(200).json({message : "Cet tarif à été modifié !"});
        } catch (error : any) {
            res.status(500).json({message : "Une erreur est survenue lors du traitement !"});
        }
    },
    deleteTarifEvent : async (req : any , res : any , next : any) =>{
        try {
            const user = req.user
            const tarifId = req.query.id
            if(user.role_id === 1)return res.status(400).json({message : "Action non-autorisée !"})
            const isTarif = await prisma.tarifEvent.findFirst({where : {id : Number(tarifId)}})
            if(!isTarif) return res.status(400).json({message : "Ce tarif n'existe pas !"})
            const deleteTarif = await prisma.tarifEvent.delete({where : {id : Number(tarifId)}})
            if(deleteTarif)return res.status(200).json({message : "Ce tarif à été supprimé !"})
        }catch (error : any) {
            res.status(500).json({message : "Une erreur est survenue lors du traitement !"});
        }
    }
}

export default TarifEventService;