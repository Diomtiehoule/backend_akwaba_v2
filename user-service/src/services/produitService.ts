import prisma from "../utils/prisma.config";
import generateString from "../utils/generateString";
const chaine = "0123456789abcdefghijklmnopqrstuvwxyz";

interface Ticket {
    montant: number;
}

const produitService = {
    createProduitByTicket: async (ticket: Ticket): Promise<any> => {
        try {
            const produit = await prisma.produit.create({
                data: {
                    code: "TICK" + generateString(chaine, 10),
                    montant: ticket.montant,
                    type: 'ticket'
                }
            });
            return produit;
        } catch (err) {
            console.error(`Erreur lors de la création du produit: ${err}`);
            throw new Error("Une erreur est survenue lors de la création du produit.");
        }
    },
    deleteTicket: async (id : number): Promise<any> => {
        try {
            const produit = await prisma.produit.deleteMany()
        } catch (err) {
            console.error(`Erreur lors de la création du produit: ${err}`);
            throw new Error("Une erreur est survenue lors de la création du produit.");
        }
    }
};

export default produitService;
