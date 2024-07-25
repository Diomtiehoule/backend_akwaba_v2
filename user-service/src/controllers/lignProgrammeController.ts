import lignProgrammeService from "../services/lignProgrammeService";
import auth from "../middlewares/authMiddleware";
import { Router } from "express";

const lignProgrammeRoute= Router();

/**
 * @swagger
 * tags:
 *   name: LignProgramme
 *   description: Gestion des lignProgrammes dans l'application.
 *   components:
 *   securitySchemes:
 *           bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 */

/**
 * @swagger
 * /lignProgramme/createLignProgramme:
 *   post:
 *     summary: Créer une lignProgramme
 *     security:
 *          - bearerAuth: []
 *     description: Ajoute une nouvelle lignProgramme dans la base de données.
 *     tags: [LignProgramme]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lignProgramme:
 *                 type: string
 *                 description: lignProgramme évènement.
 *                 example: "port bouet 2"
 *               longitude:
 *                 type: number
 *                 description: longitude .
 *                 exmple: 125.2
 *               largitude:
 *                 type: number
 *                 description: largitude.
 *               evenement:
 *                 type: string
 *                 description: Evenement associé à l'lignProgramme.
 *             required:
 *               - lignProgramme
 *               - longitude
 *               - largitude
 *               - evenement
 *     responses:
 *       '200':
 *         description: lignProgramme créé.
 *         securitySchemes:
 *           bearerAuth:
 *               type: http
 *               scheme: bearer
 *               bearerFormat: JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "lignProgramme créé !"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id de l'lignProgramme.
 *                       example: 1
 *                     lignProgramme:
 *                       type: string
 *                       description: lignProgramme.
 *                       example: "port bouet 2"
 *                     longitude:
 *                       type: number
 *                       description: Longitude.
 *                       example: 200.3
 *                     largitude:
 *                       type: number
 *                       description: Largitude.
 *                       example: 100.3
 *                     evenement:
 *                       type: string
 *                       description: Evenement
 *                       example: "festival"
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
 * /lignProgramme/getLignProgramme:
 *   get:
 *     summary: Obtenir une lignProgramme
 *     description: Récuperer l'lignProgramme.
 *     parameters:
 *          - name: id
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [LignProgramme]
 *     responses:
 *       '200':
 *         description: L'lignProgramme correspondant à l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'lignProgramme trouvé "
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id de l'lignProgramme.
 *                       example: 1
 *                     lignProgramme:
 *                       type: string
 *                       description: lignProgramme de l'évènement.
 *                       example: "port bouet 2"
 *                     longitude:
 *                       type: number
 *                       description: Longitude de l'lignProgramme.
 *                       example: 200.3
 *                     largitude:
 *                       type: number
 *                       description: Largitude de l'lignProgramme.
 *                       example: 100.3
 *                     evenement:
 *                       type: string
 *                       description: L'évènement associé à l'lignProgramme.
 *                       example: "festival"
 *       '400':
 *         description: Erreur lors de la récupération.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Aucune lignProgramme trouvé !"
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
 * /lignProgramme/getAllLignProgramme:
 *   get:
 *     summary: Obtenir la liste des lignProgrammes
 *     description: Récuperer toutes les lignProgrammes.
 *     tags: [LignProgramme]
 *     responses:
 *       '200':
 *         description: Les lignProgrammes enregistrées.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "la liste des lignProgrammes "
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id de l'lignProgramme.
 *                       example: 1
 *                     lignProgramme:
 *                       type: string
 *                       description: lignProgramme de l'évènement.
 *                       example: "port bouet 2"
 *                     longitude:
 *                       type: number
 *                       description: Longitude de l'lignProgramme.
 *                       example: 200.3
 *                     largitude:
 *                       type: number
 *                       description: Largitude de l'lignProgramme.
 *                       example: 100.3
 *                     evenement:
 *                       type: string
 *                       description: L'évènement associé à l'lignProgramme.
 *                       example: "festival"
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
 * /lignProgramme/editLignProgramme:
 *   put:
 *     summary: Mettre à jour la lignProgramme
 *     security:
 *          - bearerAuth: []
 *     description: Modifier la lignProgramme dans la base de données.
 *     parameters:
 *          - name: id
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [LignProgramme]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               lignProgramme:
 *                 type: string
 *                 description: lignProgramme de l'évènement.
 *                 example: "marocry INJS"
 *               longitude:
 *                 type: number
 *                 description: longitude.
 *                 example: 650.8
 *               largitude:
 *                 type: number
 *                 description: largitude.
 *                 example: 875.21
 *               evenement:
 *                 type: string
 *                 description: Evenement associé à la lignProgramme.
 *                 example: "Tournoi"
 *             required:
 *               - lignProgramme
 *               - longitude
 *               - largitude
 *               - evenement
 *     responses:
 *       '200':
 *         description: Mise à jour de la lignProgramme avec l'ID.
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
 * /lignProgramme/deleteLignProgramme:
 *   delete:
 *     summary: Supprimer la lignProgramme
 *     security:
 *          - bearerAuth: []
 *     description: Supprimer la lignProgramme dans la base de données.
 *     parameters:
 *          - name: id
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [LignProgramme]
 *     responses:
 *       '200':
 *         description: Supprimer la lignProgramme avec l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Suppression éffectuée"
 *       '400':
 *         description: lignProgramme introuvable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cette lignProgramme n'existe !"
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
lignProgrammeRoute.post('/createLignProgramme' , auth , lignProgrammeService.createLignProgramme);
lignProgrammeRoute.get('/getLignProgramme' , lignProgrammeService.getLignProgramme);
lignProgrammeRoute.get('/getAllLignProgramme' , lignProgrammeService.getAllLignProgramme);
lignProgrammeRoute.put('/editLignProgramme' , auth , lignProgrammeService.editLignProgramme);
lignProgrammeRoute.delete('/deleteLignProgramme' , auth , lignProgrammeService.deleteLignProgramme);

export default lignProgrammeRoute;