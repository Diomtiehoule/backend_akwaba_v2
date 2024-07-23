import adresseService from "../services/adresseService";
import auth from "../middlewares/authMiddleware";
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
 *     description: Ajoute un nouvel événement dans la base de données.
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
 *                 description: Evenement associé à l'adresse.
 *             required:
 *               - adresse
 *               - longitude
 *               - largitude
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id de l'adresse.
 *                       example: 1
 *                     adresse:
 *                       type: string
 *                       description: adresse.
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
 * /adresse/getAdresse:
 *   get:
 *     summary: Obtenir une adresse
 *     description: Récuperer l'adresse.
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
 *                       example: "port bouet 2"
 *                     longitude:
 *                       type: number
 *                       description: Longitude de l'adresse.
 *                       example: 200.3
 *                     largitude:
 *                       type: number
 *                       description: Largitude de l'adresse.
 *                       example: 100.3
 *                     evenement:
 *                       type: string
 *                       description: L'évènement associé à l'adresse.
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
 *                       example: "port bouet 2"
 *                     longitude:
 *                       type: number
 *                       description: Longitude de l'adresse.
 *                       example: 200.3
 *                     largitude:
 *                       type: number
 *                       description: Largitude de l'adresse.
 *                       example: 100.3
 *                     evenement:
 *                       type: string
 *                       description: L'évènement associé à l'adresse.
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
 * /adresse/editAdresse:
 *   put:
 *     summary: Mettre à jour la catégorie
 *     description: Modifier l'adresse dans la base de données.
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
 *                 description: Evenement associé à l'adresse.
 *                 example: "Tournoi"
 *             required:
 *               - adresse
 *               - longitude
 *               - largitude
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
 * /adresse/deleteAdresse:
 *   delete:
 *     summary: Supprimer l'adresse
 *     description: Supprimer l'adresse dans la base de données.
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
 *       '400':
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
adresseRoute.post('/createAdresse' , auth , adresseService.createAdresse);
adresseRoute.get('/getAdresse' , adresseService.getAdresse);
adresseRoute.get('/getAllAdresse' , adresseService.getAllAdresse);
adresseRoute.put('/editAdresse' , auth , adresseService.editAdresse);
adresseRoute.delete('/deleteAdresse' , auth , adresseService.deleteAdresse);

export default adresseRoute;