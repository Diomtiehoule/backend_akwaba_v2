import prisma from "../utils/prisma.config";
import { generatoken } from "../utils/token";
import bcrypt from "bcrypt";

const AdminService = {
    create : async (req : any , res : any , next : any) =>{
        try {
            const {adminname , email , password } = req.body
            const adminExist = await prisma.admin.findFirst({
                where : {email}
            })
            if(adminExist)res.status(400).json({message : "cette utilisateur existe deja..."})
            const hash = await bcrypt.hash(password , 10)
            if(!hash)res.satus(400).json({message : "erreur au niveau du cryptage..."})
            const admin = await prisma.admin.create({
            data: {
                adminname,
                email,
                password: hash
            }})
            res.status(200).json({message : "l'administrateur à été ajouté avec succès !!!" , admin})
        } catch (error) {
            res.status(500).json({message : "Une erreur s'est produite.."})
        }
    },

    loginAdmin: async (req : any , res : any , next : any)  => {
        try {
            const { email , password } = req.body;
            const adminExist = await prisma.admin.findFirst({
                where : {email}
            })
            if(!adminExist) return res.status(400).json({message : "Adresse mail ou mot de passe incorrect"})
            const isPasswordValid = await bcrypt.compare(password , adminExist.password!)
            if(!isPasswordValid) return res.status(400).json({message : "Adresse mail ou mot de passe incorrect"})
            const token = generatoken(adminExist.id)
            res.status(200).json({message : "connexion reussi à votre compte !!!" , token})
        } catch (error) {
            
        }
    },
}

export default AdminService;