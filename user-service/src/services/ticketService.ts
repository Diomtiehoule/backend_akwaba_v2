import { Ticket } from "@prisma/client";
import prisma from "../utils/prisma.config";
import produitService from "./produitService";

const chaine = "0123456789abcdefghijklmnopqrstuvwxyz";

const ticketService = {
    createTicket: async (req: any, res: any, next: any): Promise<any> => {
        try {
            const user = req.user;
            if(user.role_id === 1)return res.status(400).json({message : "Action non-autorisée !"})
                 
            const { tarif, nombre, dateEffet, dateExp } = req.body;
            const isTarif = await prisma.tarifEvent.findFirst({
                where: { typeTarif: tarif }
            });
            if (!isTarif)return res.status(400).json({ message: "Ce tarif n'existe pas !" });
            const createdTickets = await prisma.$transaction(async (prisma) => {
                const tickets = [];
                
                for (let i = 0; i < nombre; i++) {
                    const produit = await produitService.createProduitByTicket({
                        montant: isTarif.prix
                    });
                    const ticket = await prisma.ticket.create({
                        data: {
                            tarif,
                            nombre,
                            dateEffet,
                            dateExp,
                            tarifId: isTarif.id,
                            produitId: produit.id
                        }
                    });
                    tickets.push(ticket);
                }

                return tickets;
            });
            return res.status(201).json({message : "Ticket générée avec succès !"});
        } catch (error: any) {
            console.error(`L'erreur : ${error}`);
            res.status(500).json({ message: "Une erreur s'est produite lors du traitement !" });
        }
    }
};

export default ticketService;
