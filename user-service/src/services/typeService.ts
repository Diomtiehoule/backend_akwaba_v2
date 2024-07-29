import prisma from "../utils/prisma.config";

const TypeService = {
    createType : async (req : any , res : any , next : any) => {
    try{
        const user = req.user;
        if(user.role_id === 1) return res.status(401).json({message : "Action-non autorisé"});
        const { typeEvent , description } = req.body
        if(typeEvent == "" || description == "") return res.status(400).json({message : "Veuillez remplir tout les champs !"});
        const typeExist = await prisma.type.findFirst({ where : { typeEvent}})
        if(typeExist)return res.status(400).json({message : "Cet type d'évènement existe déjà..."})
        const newType = await prisma.type.create({data : {typeEvent , description}})
        if(!newType) return res.status(400).json({message : "Echec de l'ajout du type d'évènement..."})
        return res.status(201).json({message : "Type ajouté avec succès !!!"})
    }catch (err : any) {
        console.log(`l'erreur : ${err}`)
        res.status(500).json({message : "Une erreur s'est produite lors du traitement !!!"});
    }
    },
    getAllType : async (req : any , res : any , next : any) => {
        try {
            const allType = await prisma.type.findMany()
            if(allType.length === 0) return res.status(400).json({message : "Aucune liste disponible..."})
            const data = allType.map(types => {
                const info = {
                    id: types.id,
                    typeEvent : types.typeEvent,
                    description : types.description
                }
                return info
            })
            res.status(200).json({message : "la liste de tout vos type d'évènement.." , data})
        } catch (error : any) {
            console.error('Erreur lors de la mise à jour du type :', error);
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !!!"});
        }
    },
    getTypeById : async (req : any , res : any , next : any) => {
        try {
            const typeId = req.query.id
            const type = await prisma.type.findUnique({
                where : {id : Number(typeId)}
            })
            if(!type)return res.status(204).json({message :"Aucun type trouvé !"})
            const data = {
                id : type.id,
                typeEvent : type.typeEvent,
                description : type.description
            }
            res.status(200).json({message : "le type correspondant..." , data})
        } catch (error: any) {
            console.error('Erreur lors de la mise à jour du type :', error);
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !!!"});
        }
    },
    editType : async (req: any, res: any, next: any) => {
        try {
            const user = req.user;
            const typeId = req.query.id;
            if (user.role_id === 1) return res.status(401).json({ message: "Vous n'avez pas cette autorisation !!!" });
            const { typeEvent , description } = req.body;
            if(typeEvent == "" || description == "") return res.status(400).json({message : "Veuillez remplir tout les champs !"})
            const typeExist = await prisma.type.findFirst({ where: { typeEvent } });
            if(typeExist) return res.status(400).json({message : "Cet type d'évènement existe déjà !"})
            const updatedType = await prisma.type.update({where: { id : Number(typeId) },data: { typeEvent : typeEvent  , description : description}});
            if (!updatedType) return res.status(400).json({ message: "Échec de la mise à jour du type..." });
            res.status(200).json({ message: "Type mis à jour avec succès !!!" });
        } catch (error: any) {
            console.error('Erreur lors de la mise à jour du type :', error);
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !!!"});
        }
    },
    deleteType : async (req : any , res : any , next : any) =>{
        try {
            const user = req.user
            const typeId = req.query.id
            if(user.role_id === 1)return res.status(401).json({message : "vous n'avez pas cette autorisation !!!"});
            const typeExist = await prisma.type.findFirst({where : {id : Number(typeId)}});
            if(!typeExist)return res.status(400).json({message : "Aucun type trouvé"})
            const deletedType = await prisma.type.delete({ where : {id : Number(typeId)}});
            if(deletedType) res.status(200).json({message : "Ce type à été supprimer avec succès !!!"})
        } catch (error : any) {
            console.error('Erreur lors de la mise à jour du type :', error);
            res.status(500).json({message : "Une erreur s'est produite lors du traitement !!!"});
        }
    },
}
    

export default TypeService;