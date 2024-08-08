import {Router} from 'express';
import ticketService from "../services/ticketService";
import { generateTicketSchema , updateTicketSchema } from '../schema/ticketSchema';
import validateSchema from '../middlewares/validatorMiddleware';
import auth from '../middlewares/authMiddleware';

const ticketRoute = Router()

/**
 * @swagger
 * tags:
 *   name: Ticket
 *   description: Gestion des tickets dans l'application.
 */

/**
 * @swagger
 * /ticket/generateTicket:
 *   post:
 *     summary: Générer des tickets pour un événement
 *     security:
 *       - bearerAuth: []
 *     tags: [Ticket]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tarif:
 *                 type: string
 *                 description: Tarif du ticket.
 *                 example: "string"
 *               nombre:
 *                 type: integer
 *                 description: Nombre de tickets à générer.
 *                 example: 0
 *               dateEffet:
 *                 type: string
 *                 format: date
 *                 description: Date d'effet du ticket.
 *                 example: "string"
 *               dateExp:
 *                 type: string
 *                 format: date
 *                 description: Date d'expiration du ticket.
 *                 example: "string"
 *             required:
 *               - tarif
 *               - nombre
 *               - dateEffet
 *               - dateExp
 *     responses:
 *       '201':
 *         description: Ticket généré avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ticket généré avec succès !"
 *       '401':
 *         description: Erreur d'authentification.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Accès non autorisé !"
 *       '404':
 *         description: Tarif introuvable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ce tarif n'existe pas !"
 *       '500':
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Une erreur s'est produite lors du traitement !"
 */

ticketRoute.post('/generateTicket' , auth , validateSchema(generateTicketSchema)  , ticketService.createTicket);

export default ticketRoute;