import EventCategorieService from "../services/eventCategorie";
import auth from "../middlewares/authMiddleware";
import { Router } from "express";

const eventCategorieRoute = Router();
/**
 * @swagger
 * tags:
 *   name: eventCategorie
 *   description: Gestion des eventCategories dans l'application.
 */

/**
 * @swagger
 * /eventCategorie/createEventCategorie:
 *   post:
 *     summary: Créer une ligne eventCategorie
 *     security:
 *          - bearerAuth: []
 *     description: Ajoute une nouvelle ligne eventCategoriedans la base de données.
 *     tags: [eventCategorie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               evenement:
 *                 type: string
 *                 example: "string"
 *               categorie:
 *                 type: string
 *                 example: "string"
 *             required:
 *               - evenement
 *               - description
 *     responses:
 *       '200':
 *         description: ligne eventCategorie créé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ligne eventCategorie créé !"
 *       '400':
 *         description: eventCatgorie existe.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cette ligne eventCategorie existe déjà"
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
 *       '404':
 *         description: eventCategorie introuvable
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cette catégorie n'existe pas !"
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
 * /eventCategorie/getEventCategorie:
 *   get:
 *     summary: Obtenir une ligne eventCategorie
 *     description: Récuperer la catégorie.
 *     parameters:
 *          - name: id
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [eventCategorie]
 *     responses:
 *       '200':
 *         description: L'eventCategorie correspondant à l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'eventCategorie trouvée "
 *                 data:
 *                   type: object
 *                   properties: 
 *                     id:
 *                       type: number
 *                       description: id de la catégorie.
 *                       example: 1
 *                     evenement:
 *                       type: string
 *                       example: "string"
 *                     categorie:
 *                       type: string
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
 *                   example: "Aucune eventCategorie trouvée !"
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
 * /eventCategorie/getAllEventCategorie:
 *   get:
 *     summary: Obtenir la liste des eventCatégories
 *     description: Récuperer toutes les ligne eventCatégories.
 *     tags: [eventCategorie]
 *     responses:
 *       '200':
 *         description: Les catégories enregistrées.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "la liste des catégories "
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id de la catégorie.
 *                       example: 1
 *                     nom:
 *                       type: string
 *                       description: catégorie de l'évènement.
 *                       example: "string"
 *                     description:
 *                       type: string
 *                       description: description de la catégorie.
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
 * /eventCategorie/editEventCategorie:
 *   put:
 *     summary: Mettre à jour la catégorie
 *     security:
 *          - bearerAuth: []
 *     description: Modifier la catégorie dans la base de données.
 *     parameters:
 *          - name: id
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [eventCategorie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Catégorie de l'évènement.
 *                 example: "string"
 *               description:
 *                 type: string
 *                 description: description de la catégorie.
 *                 example: "string"
 *             required:
 *               - nom
 *               - description
 *     responses:
 *       '200':
 *         description: Mise à jour de la catégorie avec l'ID.
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
 * /eventCategorie/deleteEventCategorie:
 *   delete:
 *     summary: Supprimer la catégorie
 *     security:
 *          - bearerAuth: []
 *     description: Supprimer la catégorie dans la base de données.
 *     parameters:
 *          - name: id
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [eventCategorie]
 *     responses:
 *       '200':
 *         description: Supprimer la catégorie avec l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Suppression éffectuée"
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
 *       '404':
 *         description: catégorie introuvable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cette catégorie n'existe !"
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
eventCategorieRoute.post('/createEventCategorie' ,auth, EventCategorieService.createEventCategorie);
eventCategorieRoute.get('/getAllEventCategorie' , EventCategorieService.getAllEventCategorie);
eventCategorieRoute.get('/getEventCategorie' , EventCategorieService.getEventCategorie);
eventCategorieRoute.put('/editEventCategorie' ,auth, EventCategorieService.editEventCategorie);
eventCategorieRoute.delete('/deleteEventCategorie' , auth , EventCategorieService.deleteEventCategorie);

export default eventCategorieRoute;