import bcrypt from "bcrypt";
import prisma  from '../utils/prisma.config' ;
import { generatoken } from "../utils/token";


const userService = {
    createUser: async (req : any, res : any) => {
        try {
            const { username, email, number, password } = req.body;
            const userExist = await prisma.user.findFirst({ where: { email }});
            if (userExist) return res.status(400).json({ message: "Cet utilisateur existe déjà !!!" });
            const numberUsed = await prisma.user.findFirst({where: { number }});
            if (numberUsed) return res.status(400).json({ message: "Ce contact est déjà utilisé !!!" });
            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = await prisma.user.create({data: {username,email,number,password: passwordHash}});
            if (!newUser) res.status(400).json({ message: "Échec de la création de l'utilisateur..." });
            return res.status(200).json({ message: "L'utilisateur a été ajouté avec succès !!!" ,newUser});
        } catch (error) {
            console.error(`Une erreur est survenue: ${error}`);
            return res.status(500).json({ message: "Une erreur est survenue lors de la création de l'utilisateur." });
        }
    },

    loginUser : async (req : any , res : any , next : any)  => {
        try {
            const { email , password } = req.body;
            const userExist = await prisma.user.findFirst({
                where : {email}
            })
            if(!userExist) return res.status(400).json({message : "Adresse mail ou mot de passe incorrect"})
            const isPasswordValid = await bcrypt.compare(password , userExist.password!)
            if(!isPasswordValid) return res.status(400).json({message : "Adresse mail ou mot de passe incorrect"})
            const token = generatoken(userExist.id)
            res.status(200).json({message : "connexion reussi à votre compte !!!" , token})
        } catch (error) {
            
        }
    },
    getUser : async (req : any , res : any , next : any) => {
        try {
            const allUser = await prisma.user.findMany();
            if(!allUser) return res.status(400).json({message : 'aucun user trouvé'})
            return res.status(200).json({message : 'les utilisateurs sont : ' , allUser})
        } catch (error : any) {
            console.log(error)
        }
    }

}

export default userService;