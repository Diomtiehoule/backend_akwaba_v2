import TarifEventService from "../services/tarifEventService";
import auth from "../middlewares/authMiddleware";
import { Router } from "express";

const tarifEventRoute = Router()

/**
 * @swagger
 * tags:
 *   name: Tarif
 *   description: Gestion des Tarif dans l'application.
 */

/**
 * @swagger
 * /tarifEvent/createTarif:
 *   post:
 *     summary: Créer un tarif
 *     description: Ajoute un nouveau tarif dans la base de données.
 *     tags: [Tarif]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: nom du tarif.
 *                 example: "VIP"
 *               prix:
 *                 type: number
 *                 description: le prix du tarif .
 *                 example: 25000
 *               event:
 *                 type: string
 *                 description: Evènement associé au tarif.
 *                 example: "MASSA"
 *             required:
 *               - nom
 *               - description
 *               - event
 *     responses:
 *       '200':
 *         description: tarif créé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "tarif créé !"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id du tarif.
 *                       example: 1
 *                     nom:
 *                       type: string
 *                       description: nom du tarif.
 *                       example: "MASSA"
 *                     prix:
 *                       type: number
 *                       description: prix du tarif.
 *                       example: 25000
 *                     event:
 *                       type: string
 *                       description: Evènement associé au tarif .
 *                       exmple: "MASSA"
 *       '400':
 *         description: Erreur champs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Veuillez remplir tout les champs !"
 *       '401':
 *         description: Erreur de token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Accès non-autorisé !"
 *       '500':
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Une erreur s'est produite lors du traitement !!!"
 * 
 * /tarifEvent/getTarif:
 *   get:
 *     summary: Obtenir un tarif
 *     description: Récuperer le tarif.
 *     tags: [Tarif]
 *     responses:
 *       '200':
 *         description: Le tarif correspondant à l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Le tarif trouvé "
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id du tarif.
 *                       example: 1
 *                     nom:
 *                       type: string
 *                       description: nom du tarif.
 *                       example: "VIP"
 *                     prix:
 *                       type: number
 *                       description: le prix du tarif.
 *                       example: 2500
 *                     event:
 *                       type: string
 *                       description: Evènement associé au tarif.
 *                       example: "MASSA"
 *       '400':
 *         description: Erreur lors de la récupération.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Aucune tarif trouvée !"
 *       '500':
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Une erreur s'est produite lors du traitement !!!"
 * 
 * /tarifEvent/getAllTarif:
 *   get:
 *     summary: Obtenir la liste des tarifs
 *     description: Récuperer tout les tarifs.
 *     tags: [Tarif]
 *     responses:
 *       '200':
 *         description: Les tarifs enregistrées.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "la liste des tarifs "
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id de l'évènement.
 *                       example: 1
 *                     nom:
 *                       type: string
 *                       description: nom du tarif.
 *                       example: "VIP"
 *                     prix:
 *                       type: number
 *                       description: prix du tarif.
 *                       example: 25000
 *                     event:
 *                       type: string
 *                       description: Evènement associé au tarif.
 *                       example: "MASSA"
 *                     
 *       '400':
 *         description: Erreur lors de la récupération.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "La liste est vide !"
 *       '500':
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Une erreur s'est produite lors du traitement !!!"
 * 
 * /tarifEvent/editTarif:
 *   put:
 *     summary: Mettre à jour le tarif
 *     description: Modifier le tarif dans la base de données.
 *     tags: [Tarif]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: le nom du tarif.
 *                 example: "VIP"
 *               prix:
 *                 type: number
 *                 description: le prix du tarif.
 *                 example: 25000
 *               event:
 *                 type: string
 *                 description: évènement associé au tarif.
 *                 example: "MASSA"
 *             required:
 *               - typeTarif
 *               - prix
 *               - event
 *     responses:
 *       '200':
 *         description: Mise à jour du tarif avec l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Mise à jour éffectuée"
 *       '400':
 *         description: Erreur champs.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Veuillez remplir tout les champs !"
 *       '401':
 *         description: Erreur de token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Accès non-autorisé !"
 *       '500':
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Une erreur s'est produite lors du traitement !!!"
 * 
 * /tarifEvent/deleteTarif:
 *   delete:
 *     summary: Supprimer le tarif
 *     description: Supprimer le tarif dans la base de données.
 *     tags: [Tarif]
 *     responses:
 *       '200':
 *         description: Supprimer le tarif avec l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Suppression éffectuée"
 *       '400':
 *         description: tarif introuvable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ce tarif n'existe pas !"
 *       '401':
 *         description: Erreur de token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Accès non-autorisé !"
 *       '500':
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Une erreur s'est produite lors du traitement !!!"
 */
tarifEventRoute.post('/createTarif' , auth ,TarifEventService.createTarifEvent);
tarifEventRoute.get('/getTarifById' , TarifEventService.getTarifEventById);
tarifEventRoute.get('/getAllTarif' , TarifEventService.getAllTarifEvent);
tarifEventRoute.put('/editTarif' , auth , TarifEventService.editTarifEvent);
tarifEventRoute.delete('/deleteTarif' , auth , TarifEventService.deleteTarifEvent);

export default tarifEventRoute;