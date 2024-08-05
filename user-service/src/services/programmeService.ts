import prisma from "../utils/prisma.config";

const programmeService = {
    createProgramme : async (req : any , res : any , next : any) => {
        try {
            const user = req.user
            if(user.role_id === 1) return res.status(401).json({message : "Action non-autorisé !"});
            const {programme , evenement } = req.body;
            if(programme == '' || evenement == '') return res.status(400).json({message : "Veuillez remplir tout les champs !"})
            const isEvent = await prisma.event.findFirst({where : {nom : evenement} })
            if(!isEvent)return res.status(400).json({message : "Cet évènement n'existe pas !"})
            const programmeExist = await prisma.programme.findFirst({where : {programme , evenement}})
            if(programmeExist) return res.status(400).json({message : "Ce programme existe déjà !"})
            const newProgramme = await prisma.programme.create({data : {programme , evenement , eventId : isEvent.id}})
            return res.status(200).json({message : "Programme ajouté !"})
        } catch (error : any) {
            console.log(`l'erreur : ${error}`)
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !"})
        }
    },
    getProgramme : async (req : any , res : any , next : any) => {
        try {
            const ProgrammeId = req.query.id
            const isProgramme = await prisma.programme.findFirst({where : { id : Number(ProgrammeId)}})
            if(!isProgramme)return res.status(400).json({message : "Aucun programme trouvé !"})
            const data = {
                id : isProgramme.id,
                programme : isProgramme.programme,
                evenement : isProgramme.evenement
            }
            return res.status(200).json({messsage : "Le programme trouvé.." , data})
        } catch (error : any) {
            console.log(`l'erreur : ${error}`)
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !"})
        }
    },
    getAllProgramme : async (req : any , res : any , next : any) => {
        try {
            const allProgramme = await prisma.programme.findMany()
            if(allProgramme.length === 0)return res.status(400).json({message : "La liste des programmes est vide !"})
            const data = allProgramme.map(programme => {
                const infos = {
                    id : programme.id,
                    programme : programme.programme,
                    evenement : programme.evenement
                }
                return infos
            })
            return res.status(200).json({message : "La liste de tout les programme" , data})
        } catch (error : any) {
            console.log(`l'erreur : ${error}`)
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !"})
        }
    },
    editProgramme : async (req : any , res : any , next : any) => {
        try {
            const {userId} = req.auth
            const programmeId = req.query.id
            const isAdmin = await prisma.admin.findFirst({where : {id : userId}})
            if(!isAdmin)return res.status(401).json({message : "Action non-autorisée !"})
            const isProgramme = await prisma.programme.findFirst({where :{id : Number(programmeId)}})
            if(!isProgramme)return res.status(400).json({message : "Ce programme n'existe pas !"})
            const {programme , evenement} = req.body
            if(programme == "" || evenement == "")return res.status(400).json({message : "Veuillez remplir tout les champs !"})
            const isEvent = await prisma.event.findFirst({where: {nom : evenement}})
            if(!isEvent)return res.status(400).json({message : "Cet évènement n'existe pas !"})
            const programmeExist = await prisma.programme.findFirst({where : { programme , evenement}})
            if(programmeExist)return res.status(400).json({message : "Ce programme existe déjà !"})
            const updateProgramme = await prisma.programme.update({where : {id : Number(programmeId)} , data : {programme , evenement , eventId : isEvent.id}})
            if(updateProgramme)return res.status(200).json({message : "Mise à jours éffectué !"})
        } catch (error : any) {
            console.log(`l'erreur : ${error}`)
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !"})
        }
    },
    deleteProgramme : async (req : any , res : any , next : any) => {
        try {
            const {userId} = req.auth
            const programmeId = req.query.id
            const isAdmin = await prisma.admin.findFirst({where : {id : userId}})
            if(!isAdmin)return res.status(401).json({message : "Action non-autorisée !"})
            const isProgramme = await prisma.programme.findFirst({where :{id : Number(programmeId)}})
            if(!isProgramme)return res.status(400).json({message : "Ce programme n'existe pas !"})
            const deleteProgramme = await prisma.programme.delete({where : {id : Number(programmeId)}})
            if(deleteProgramme)return res.status(200).json({message : "Programme supprimé !"})
        } catch (error : any) {
            console.log(`l'erreur : ${error}`)
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !"})
        }
    }
}

export default programmeService;