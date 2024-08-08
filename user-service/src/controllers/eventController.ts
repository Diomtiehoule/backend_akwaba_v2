import EventService from "../services/eventService";
import auth from "../middlewares/authMiddleware";
import { createEventSchema , updateEventSchema } from "../schema/eventSchema";
import validateSchema from "../middlewares/validatorMiddleware";
import { Router } from "express";

const eventRoute = Router();

/**
 * @swagger
 * tags:
 *   name: Event
 *   description: Gestion des event dans l'application.
 */

/**
 * @swagger
 * /event/createEvent:
 *   post:
 *     summary: Créer un évènement
 *     security:
 *          - bearerAuth: []
 *     description: Ajoute un nouvel événement dans la base de données.
 *     tags: [Event]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: nom de l'évènement.
 *                 example: "string"
 *               description:
 *                 type: string
 *                 description: description de l'évènement .
 *                 exmple: "string"
 *               lieu:
 *                 type: string
 *                 description: lieu de l'évènement.
 *                 example: "string"
 *               dateDebut:
 *                 type: string
 *                 description: date de debut de l'évènement.
 *                 example: "string"
 *               dateFin:
 *                 type: string
 *                 description: date de fin de l'évènement.
 *                 example: "string"
 *               typeEvent:
 *                 type: string
 *                 description: type de l'évènement.
 *                 example: "string"
 *             required:
 *               - nom
 *               - description
 *               - lieu
 *               - dateDebut
 *               - dateFin
 *               - typeEvent
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
 * /event/getEvent:
 *   get:
 *     summary: Obtenir un évènement
 *     description: Récuperer l'évènement.
 *     parameters:
 *          - name: id
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [Event]
 *     responses:
 *       '200':
 *         description: L'évènement correspondant à l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'évènement trouvé "
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id de l'évènement.
 *                       example: 1
 *                     nom:
 *                       type: string
 *                       description: nom de l'évènement.
 *                       example: "string"
 *                     description:
 *                       type: string
 *                       description: description de l'évènement.
 *                       example: "string"
 *                     lieu:
 *                       type: string
 *                       description: lieu de l'évènement.
 *                       example: "string"
 *                     dateDebut:
 *                       type: string
 *                       description: date de debut de l'évènement.
 *                       example: "string"
 *                     dateFin:
 *                       type: string
 *                       description: date de fin de l'évènement.
 *                       example: "string"
 *                     typeEvent:
 *                       type: string
 *                       description: type de l'évènement.
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
 *                   example: "Aucun évènement trouvé !"
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
 * /event/getEventByType:
 *   get:
 *     summary: Obtenir un évènement
 *     description: Récuperer l'évènement.
 *     parameters:
 *          - name: type
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [Event]
 *     responses:
 *       '200':
 *         description: Les évènements correspondant au type.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'évènement trouvé "
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id de l'évènement.
 *                       example: 1
 *                     nom:
 *                       type: string
 *                       description: nom de l'évènement.
 *                       example: "string"
 *                     description:
 *                       type: string
 *                       description: description de l'évènement.
 *                       example: "string"
 *                     lieu:
 *                       type: string
 *                       description: lieu de l'évènement.
 *                       example: "string"
 *                     dateDebut:
 *                       type: string
 *                       description: date de debut de l'évènement.
 *                       example: "string"
 *                     dateFin:
 *                       type: string
 *                       description: date de fin de l'évènement.
 *                       example: "string"
 *                     typeEvent:
 *                       type: string
 *                       description: type de l'évènement.
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
 *                   example: "Aucun évènement trouvé !"
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
 * /event/getEventByLocation:
 *   get:
 *     summary: Obtenir un évènement
 *     description: Récuperer l'évènement.
 *     parameters:
 *          - name: lieu
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [Event]
 *     responses:
 *       '200':
 *         description: Les évènements correspondant au lieu.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "L'évènement trouvé "
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id de l'évènement.
 *                       example: 1
 *                     nom:
 *                       type: string
 *                       description: nom de l'évènement.
 *                       example: "string"
 *                     description:
 *                       type: string
 *                       description: description de l'évènement.
 *                       example: "string"
 *                     lieu:
 *                       type: string
 *                       description: lieu de l'évènement.
 *                       example: "string"
 *                     dateDebut:
 *                       type: string
 *                       description: date de debut de l'évènement.
 *                       example: "string"
 *                     dateFin:
 *                       type: string
 *                       description: date de fin de l'évènement.
 *                       example: "string"
 *                     typeEvent:
 *                       type: string
 *                       description: type de l'évènement.
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
 *                   example: "Aucun évènement trouvé !"
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
 * /event/getAllEvent:
 *   get:
 *     summary: Obtenir la liste des évènements
 *     description: Récuperer tout les évènements.
 *     tags: [Event]
 *     responses:
 *       '200':
 *         description: Les évènements enregistrées.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "la liste des évènements "
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id de l'évènement.
 *                       example: 1
 *                     nom:
 *                       type: string
 *                       description: nom de l'évènement.
 *                       example: "string"
 *                     description:
 *                       type: string
 *                       description: description de l'évènement.
 *                       example: "string"
 *                     lieu:
 *                       type: string
 *                       description: Le lieu de l'évènement.
 *                       example: "string"
 *                     dateDebut:
 *                       type: string
 *                       description: date de début de l'évènement.
 *                       example: "string"
 *                     dateFin:
 *                       type: string
 *                       description: date de fin de l'évènement.
 *                       example: "string"
 *                     typeEvent:
 *                       type: string
 *                       description: le type d'évènement.
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
 * /event/editEvent:
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
 *     tags: [Event]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom de l'évènement.
 *                 example: "string"
 *               description:
 *                 type: string
 *                 description: description de l'évènement.
 *                 example: "string"
 *               lieu:
 *                 type: string
 *                 description: lieu del'évènement.
 *                 example: "string"
 *               dateDebut:
 *                 type: string
 *                 description: date de debut de l'évènement.
 *                 example: "string"
 *               dateFin:
 *                 type: string
 *                 description: date de fin de l'évènement.
 *                 example: "string"
 *               typeEvent:
 *                 type: string
 *                 description: le type associé à l'évènement.
 *                 example: "string"
 *             required:
 *               - nom
 *               - description
 *               - lieu
 *               - dateDebut
 *               - dateFin
 *               - typeEvent
 *     responses:
 *       '200':
 *         description: Mise à jour de l'évènement avec l'ID.
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
 * /event/deleteEvent:
 *   delete:
 *     summary: Supprimer l'évènement
 *     security:
 *          - bearerAuth: []
 *     description: Supprimer l'évènement dans la base de données.
 *     parameters:
 *          - name: id
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [Event]
 *     responses:
 *       '200':
 *         description: Supprimer l'évènement avec l'ID.
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
 * 
 *       '404':
 *         description: Adresse introuvable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cet évènement n'existe !"
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
eventRoute.post('/createEvent' , auth ,validateSchema(createEventSchema), EventService.createEvent);
eventRoute.get('/getAllEvent' , EventService.getAllEvents);
// eventRoute.get('/getEvent' ,  EventService.getEventById);
eventRoute.get('/getEvent' , EventService.getAllInfoEvent);
eventRoute.get('/getEventByType' , EventService.getEventByType);
eventRoute.get('/getEventByLocation' , EventService.getEventByLocation);
eventRoute.put('/editEvent' , auth , validateSchema(updateEventSchema), EventService.editEvent);
eventRoute.delete('/deleteEvent' , auth , EventService.deleteEvent);


export default eventRoute;