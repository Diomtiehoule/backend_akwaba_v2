import prisma from "../utils/prisma.config";

const adresseService = {
    createAdresse : async (req : any , res : any , next : any) => {
        try {
            const {userId} = req.auth
            const isAdmin = await prisma.admin.findFirst({where : {id : userId}})
            if(!isAdmin)return res.status(401).json({message : "Action non-autorisée !"})
            const {adresse , longitude , largitude , evenement} = req.body
            if(adresse == "" || longitude == "" || largitude == "" || evenement == "") return res.status(400).json({message : "Veuillez remplir tout les champs !"})
            const isEvent = await prisma.event.findFirst({where : {nom : evenement}})
            if(!isEvent)return res.status(400).json({message : "Cet évènement n'existe pas !"})
            const adresseExiste = await prisma.adresse.findFirst({where : {adresse , longitude , largitude , evenement}})
            if(adresseExiste)return res.status(400).json({message : "Cet adresse  existe déjà !"})
            const newAdresse = await prisma.adresse.create({data : {adresse , longitude , largitude , evenement , eventId : isEvent.id}})
            if(newAdresse)return res.status(201).json({message : "Adresse ajoutée !"})
        } catch (error : any) {
            console.log(`L'erreur : ${error}`)
            res.status(500).json({message : "Une erreur s'est produite lors du traitement " , err: error.message})
        }
    },
    getAdresse : async (req : any , res : any , next : any) => {
        try {
            const adresseId = req.query.id
            const isAdresse = await  prisma.adresse.findFirst({where : {id : Number(adresseId)}})
            if(!isAdresse) return res.status(400).json({message : "Cette adresse n'existe pas !"})
            const data = {
                id : isAdresse.id,
                adresse : isAdresse.adresse,
                longitude : isAdresse.longitude,
                largitude : isAdresse.largitude,
                evenement : isAdresse.evenement
            }
            return res.status(400).json({message : "L'adresse trouvée" , data})
        } catch (error : any) {
            console.log(`L'erreur : ${error}`)
            res.status(500).json({message : "Une erreur s'est produite lors du traitement " , err: error.message})
        }
    },
    getAllAdresse : async (req : any , res : any , next : any) => {
        try {
            const allAdresse = await prisma.adresse.findMany()
            if(allAdresse.length === 0) return res.status(400).json({message : "La lsite est vide"})
            const data = allAdresse.map(adresse =>{
                const info = {
                    adresse : adresse.adresse,
                    longitude : adresse.longitude,
                    largitude : adresse.largitude,
                    evenement : adresse.evenement
                }
                return info
            })
            return res.status(400).json({message : "La liste de toutes les adresses" , data})
        } catch (error : any) {
            console.log(`L'erreur : ${error}`)
            res.status(500).json({message : "Une erreur s'est produite lors du traitement " , err: error.message})
        }
    },
    editAdresse : async (req : any , res : any , next : any) => {
        try {
            const {userId} = req.auth
            const adresseId = req.query.id
            const isAdmin = await prisma.admin.findFirst({where : {id : userId}})
            if(!isAdmin)return res.status(401).json({message : "Action non-autorisée !"})
            const isAdresse = await prisma.adresse.findFirst({where :{id : Number(adresseId)}})
            if(!isAdresse)return res.status(400).json({message : "Cette adresse n'existe pas !"})
            const {adresse , longitude , largitude , evenement} = req.body
            if(adresse == "" || longitude == "" || largitude == "" || evenement == "")return res.status(400).json({message : "Veuillez remplir tout les champs !"})
            const isEvent = await prisma.event.findFirst({where: {nom : evenement}})
            if(!isEvent)return res.status(400).json({message : "Cet évènement n'existe pas !"})
            const adresseExist = await prisma.adresse.findFirst({where : { adresse , longitude , largitude , evenement}})
            if(adresseExist)return res.status(400).json({message : "Cette adresse existe déjà !"})
            const updateAdresse = await prisma.adresse.update({where : {id : Number(adresseId)} , data : {adresse , longitude , largitude , evenement , eventId : isEvent.id}})
            if(updateAdresse)return res.status(200).json({message : "Mise à jours éffectué !"})
        } catch (error : any) {
            console.log(`L'erreur : ${error}`)
            res.status(500).json({message : "Une erreur s'est produite lors du traitement " , err: error.message})
        }
    },
    deleteAdresse : async (req : any , res : any , next : any) => {
        try {
            const {userId} = req.auth
            const adresseId = req.query.id
            const isAdmin = await prisma.admin.findFirst({where : {id : userId}})
            if(!isAdmin)return res.status(401).json({message : "Action non-autorisée !"})
            const isAdresse = await prisma.adresse.findFirst({where :{id : Number(adresseId)}})
            if(!isAdresse)return res.status(400).json({message : "Cette adresse n'existe pas !"})
            const deleteAdresse = await prisma.adresse.delete({where : {id : Number(adresseId)}})
            if(deleteAdresse)return res.status(200).json({message : "Adresse supprimé !"})
        } catch (error : any) {
            console.log(`L'erreur : ${error}`)
            res.status(500).json({message : "Une erreur s'est produite lors du traitement " , err: error.message})
        }
    }
}

export default adresseService;