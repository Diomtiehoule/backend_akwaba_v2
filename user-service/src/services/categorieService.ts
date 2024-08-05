import prisma from "../utils/prisma.config";

const CategorieService = {
    createCategorie: async (req : any , res :any , next : any) => {
        try {
            const user = req.user
            if(user.role_id === 1) return res.status(401).json({message : "Action non-autorisé !"});
            const { nom , description } = req.body;
            if(nom == "" || description == "") return res.status(400).json({message : "Veuillez remplir tout les champs !"})
            const categorieExist = await prisma.categorie.findFirst({where : {nom , description}});
            if(categorieExist) return res.status(400).json({message : "Cette catégorie existe déjà !"})
            const newCategorie = await prisma.categorie.create({
                data: {
                  nom: nom,
                  description: description
                }
              });
            if(newCategorie) return res.status(201).json({message : "Catégorie ajouté avec succès"})
        } catch ( error : any) {
            res.status(500).json({message : "Une erreur s'est produite lor du traitement" , err : error.message})
        }
       
    },
    editCategorie: async (req : any , res : any , next : any) => {
        try {
            const user = req.user
            const categorieId = req.query.id;;
            if(user.role_id === 1) return res.status(401).json({message : "Action non-autorisé !"})
            const isCategorie = await prisma.categorie.findFirst({where : {id : Number(categorieId)}})
            if(!isCategorie) return res.status(400).json({message :"Aucune catégorie trouvé !"})
            const {nom , description} = req.body
            if(nom == "" || description == "") return res.status(400).json({message : "Veuillez remplir tout les champs !"})
            const categorieExist = await prisma.categorie.findFirst({where : {nom , description}})
            if(categorieExist) return res.status(400).json({message : "Cette catégorie existe déjà !"})
            const updateCategorie = await prisma.categorie.update({where : { id : Number(categorieId)} , data : { nom , description}});
            if(updateCategorie)return res.status(200).json({message : "Mise à jours effectué !"})
        } catch (error : any) {
            console.log("l'erreur :" , error)
            res.status(500).json({message : "Une erreur s'est produite lor du traitement" , err : error.message})
        }
    },
    getAllCategorie: async (req : any , res : any , next : any) => {
        try {
            const allCategories = await prisma.categorie.findMany();
            if(allCategories.length === 0) return res.status(400).json({message : "La liste de catégorie est vide !"})
            const dataClone = allCategories.map(categorie =>{
                const data = {
                    id : categorie.id,
                    nom : categorie.nom,
                    description : categorie.description
                }
                return data
            })
            return res.status(200).json({message : "La liste des catégories..." , dataClone})
        } catch (error : any) {
            console.log(`L'erreur : ${error}`)
        }
    },
    getCategorieById: async (req : any , res : any , next : any) => {
        try {
            const categorieId = req.query.id;
            const iscategorie = await prisma.categorie.findFirst({where : {id : Number(categorieId)}})
            if(!iscategorie) return res.status(400).json({message : "Cette catégorie n'existe pas !"})
            const data = {
                id : iscategorie.id,
                nom : iscategorie.nom,
                description : iscategorie.description
            };
            return res.status(200).json({message : "Catégorie trouvé !", data})
        } catch (error : any) {
            console.log(`L'erreur: ${error}`);
        }
        
    },
    deleteCategorie: async (req : any , res : any , next : any) => {
        try {
            const user = req.user
            const categorieId = req.query.id;
            if(user.role_id === 1) return res.status(400).json({message : "Action non-autorisée !"})
            const isCategorie = await prisma.categorie.findFirst({where : {id : Number(categorieId)}})
            if(!isCategorie) return res.status.json({message : "Cette catégorie n'existe pas !"})
            const deleteCategorie = await prisma.categorie.delete({where : {id : Number(categorieId)}})
            if(deleteCategorie) return res.status(200).json({message : "Catégorie supprimée avec succès !"})
        } catch (error : any) {
            console.log("l'erreur :" , error)
            res.status(500).json({message : "Une erreur s'est produite lor du traitement" , err : error.message})
        }
    }
}

export default CategorieService;