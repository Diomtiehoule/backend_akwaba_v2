import programmeService from "../services/programmeService";
import { createProgrammeSchema, updateProgrammeSchema } from "../schema/programmeSchema";
import validateSchema from "../middlewares/validatorMiddleware";
import auth from "../middlewares/authMiddleware";
import { Router } from "express";

const programmeRoute = Router()

/**
 * @swagger
 * tags:
 *   name: Programme
 *   description: Gestion des programmes dans l'application.
 */

/**
 * @swagger
 * /programme/createProgramme:
 *   post:
 *     summary: Créer un programme
 *     security:
 *          - bearerAuth: []
 *     description: Ajoute un nouveau programme dans la base de données.
 *     tags: [Programme]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               programme:
 *                 type: string
 *                 description: programme de l'évènement.
 *                 example: "string"
 *               evenement:
 *                 type: string
 *                 description: 2vènement associé au programme .
 *                 example: "string"
 *             required:
 *               - programme
 *               - evenement
 *     responses:
 *       '200':
 *         description: programme créé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "programme créé !"
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
 * /programme/getProgramme:
 *   get:
 *     summary: Obtenir un programme
 *     description: Récuperer le programme.
 *     parameters:
 *          - name: id
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [Programme]
 *     responses:
 *       '200':
 *         description: Le programme correspondant à l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Le programme trouvée "
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id du programme.
 *                       example: 1
 *                     programme:
 *                       type: string
 *                       description: programme de l'évènement.
 *                       example: "string"
 *                     evenement:
 *                       type: number
 *                       description: evènement associé au programme.
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
 *                   example: "Aucune catégorie trouvée !"
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
 * /programme/getAllProgramme:
 *   get:
 *     summary: Obtenir la liste des programme
 *     description: Récuperer tout les programmes.
 *     tags: [Programme]
 *     responses:
 *       '200':
 *         description: Les programmes enregistrées.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "la liste des programmes "
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id du programme.
 *                       example: 1
 *                     programme:
 *                       type: string
 *                       description: programme de l'évènement.
 *                       example: "string"
 *                     evenement:
 *                       type: string
 *                       description: evenement associé au programme.
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
 * /programme/editProgramme:
 *   put:
 *     summary: Mettre à jour le programme
 *     security:
 *          - bearerAuth: []
 *     description: Modifier le programme dans la base de données.
 *     parameters:
 *          - name: id
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [Programme]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prgramme:
 *                 type: string
 *                 description: programme de l'évènement.
 *                 example: "string"
 *               evenement:
 *                 type: string
 *                 description: evenement associé au programme.
 *                 example: "string"
 *             required:
 *               - programme
 *               - evenement
 *     responses:
 *       '200':
 *         description: Mise à jour du programme avec l'ID.
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
 * /programme/deleteProgramme:
 *   delete:
 *     summary: Supprimer le programme
 *     security:
 *          - bearerAuth: []
 *     description: Supprimer le programme dans la base de données.
 *     parameters:
 *          - name: id
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [Programme]
 *     responses:
 *       '200':
 *         description: Supprimer le programme avec l'ID.
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
 *         description: programme introuvable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ce programme n'existe !"
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

programmeRoute.post('/createProgramme' , auth ,validateSchema(createProgrammeSchema) , programmeService.createProgramme);
programmeRoute.get('/getProgramme' , programmeService.getProgramme);
programmeRoute.get('/getAllProgramme' , programmeService.getAllProgramme);
programmeRoute.put('/editProgramme' , auth ,validateSchema(updateProgrammeSchema) , programmeService.editProgramme);
programmeRoute.delete('/deleteProgramme' , auth , programmeService.deleteProgramme);

export default programmeRoute;