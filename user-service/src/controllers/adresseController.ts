import adresseService from "../services/adresseService";
import auth from "../middlewares/authMiddleware";
import { createAdresseSchema , updateAdresseSchema } from "../schema/adresseSchema";
import validateSchema from "../middlewares/validatorMiddleware";
import { Router } from "express";

const adresseRoute = Router()

/**
 * @swagger
 * tags:
 *   name: Adresse
 *   description: Gestion des adresses dans l'application.
 */

/**
 * @swagger
 * /adresse/createAdresse:
 *   post:
 *     summary: Créer une adresse
 *     security:
 *          - bearerAuth: []
 *     description: Ajoute un nouvel événement dans la base de données.
 *     components:
 *      securitySchemes:
 *           bearerAuth:
 *           type: http
 *           scheme: bearer
 *           bearerFormat: JWT
 *     tags: [Adresse]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               adresse:
 *                 type: string
 *                 description: Adresse évènement.
 *                 example: "string"
 *               longitude:
 *                 type: number
 *                 description: longitude .
 *                 example: 0
 *               latitude:
 *                 type: number
 *                 description: latitude.
 *               evenement:
 *                 type: string
 *                 description: Evenement associé à l'adresse.
 *                 example: 0
 *             required:
 *               - adresse
 *               - longitude
 *               - latitude
 *               - evenement
 *     responses:
 *       '200':
 *         description: Adresse créé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Adresse créé !"
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
 * /adresse/getAdresse:
 *   get:
 *     summary: Obtenir une adresse
 *     description: Récuperer l'adresse.
 *     parameters:
 *          - name: id
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [Adresse]
 *     responses:
 *       '200':
 *         description: L'adresse correspondant à l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'adresse trouvé "
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id de l'adresse.
 *                       example: 1
 *                     adresse:
 *                       type: string
 *                       description: adresse de l'évènement.
 *                       example: "string"
 *                     longitude:
 *                       type: number
 *                       description: Longitude de l'adresse.
 *                       example: 0
 *                     latitude:
 *                       type: number
 *                       description: latitude de l'adresse.
 *                       example: 0
 *                     evenement:
 *                       type: string
 *                       description: L'évènement associé à l'adresse.
 *                       example: "string"
 *       '404':
 *         description: Erreur lors de la récupération.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Aucune adresse trouvé !"
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
 * /adresse/getAllAdresse:
 *   get:
 *     summary: Obtenir la liste des adresses
 *     description: Récuperer toutes les adresses.
 *     tags: [Adresse]
 *     responses:
 *       '200':
 *         description: Les adresses enregistrées.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "la liste des adresses "
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id de l'adresse.
 *                       example: 1
 *                     adresse:
 *                       type: string
 *                       description: adresse de l'évènement.
 *                       example: "string"
 *                     longitude:
 *                       type: number
 *                       description: Longitude de l'adresse.
 *                       example: 0
 *                     latitude:
 *                       type: number
 *                       description: latitude de l'adresse.
 *                       example: 0
 *                     evenement:
 *                       type: string
 *                       description: L'évènement associé à l'adresse.
 *                       example: "string"
 *                     
 *       '404':
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
 * /adresse/editAdresse:
 *   put:
 *     summary: Mettre à jour la catégorie
 *     security:
 *          - bearerAuth: []
 *     description: Modifier l'adresse dans la base de données.
 *     parameters:
 *          - name: id
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [Adresse]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               adresse:
 *                 type: string
 *                 description: Adresse évènement.
 *                 example: "string"
 *               longitude:
 *                 type: number
 *                 description: longitude.
 *                 example: 0
 *               latitude:
 *                 type: number
 *                 description: latitude.
 *                 example: 0
 *               evenement:
 *                 type: string
 *                 description: Evenement associé à l'adresse.
 *                 example: "string"
 *             required:
 *               - adresse
 *               - longitude
 *               - latitude
 *               - evenement
 *     responses:
 *       '200':
 *         description: Mise à jour de l'adresse avec l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Mise à jour éffectuée"
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
 * /adresse/deleteAdresse:
 *   delete:
 *     summary: Supprimer l'adresse
 *     security:
 *          - bearerAuth: []
 *     description: Supprimer l'adresse dans la base de données.
 *     parameters:
 *          - name: id
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [Adresse]
 *     responses:
 *       '200':
 *         description: Supprimer l'adresse avec l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Suppression éffectuée"
 *       '404':
 *         description: Adresse introuvable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cette adresse n'existe !"
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
adresseRoute.post('/createAdresse' , auth ,validateSchema(createAdresseSchema), adresseService.createAdresse);
adresseRoute.get('/getAdresse' , adresseService.getAdresse);
adresseRoute.get('/getAllAdresse' , adresseService.getAllAdresse);
adresseRoute.put('/editAdresse' , auth ,validateSchema(createAdresseSchema), adresseService.editAdresse);
adresseRoute.delete('/deleteAdresse' , auth , adresseService.deleteAdresse);

export default adresseRoute;