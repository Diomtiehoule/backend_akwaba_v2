import TypeService from "../services/typeService";
import auth from "../middlewares/authMiddleware";
import { createTypeSchema , updateTypeSchema } from "../schema/typeSchema";
import validateSchema from "../middlewares/validatorMiddleware";
import { Router } from "express";

const typeRoute = Router()

/**
 * @swagger
 * tags:
 *   name: Type
 *   description: Gestion des types dans l'application.
 */

/**
 * @swagger
 * /type/createType:
 *   post:
 *     summary: Créer un type
 *     security:
 *          - bearerAuth: []
 *     description: Ajoute un nouveau type dans la base de données.
 *     tags: [Type]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               typeEvent:
 *                 type: string
 *                 description: le type d'évènement.
 *                 example: "personel"
 *               description:
 *                 type: string
 *                 description: description du type d'évènement .
 *                 example: "évènement de type restreint"
 *             required:
 *               - typeEvent
 *               - description
 *     responses:
 *       '200':
 *         description: type créé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "type créé !"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id du type.
 *                       example: 1
 *                     typeEvent:
 *                       type: string
 *                       description: type d'évènement.
 *                       example: "personel"
 *                     description:
 *                       type: string
 *                       description: description du type d'évènement .
 *                       example: "évènement de type restreint"
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
 * /type/getType:
 *   get:
 *     summary: Obtenir un type
 *     description: Récuperer le type.
 *     parameters:
 *          - name: id
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [Type]
 *     responses:
 *       '200':
 *         description: Le type correspondant à l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Le type trouvé "
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id du type.
 *                       example: 1
 *                     typeEvent:
 *                       type: string
 *                       description: le type d'évènement.
 *                       example: "personel"
 *                     description:
 *                       type: string
 *                       description: description du type d'évènement.
 *                       example: "évènement de type restreint"
 *       '400':
 *         description: Erreur lors de la récupération.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Aucune type trouvée !"
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
 * /type/getAllType:
 *   get:
 *     summary: Obtenir la liste des types
 *     description: Récuperer tout les types.
 *     tags: [Type]
 *     responses:
 *       '200':
 *         description: Les types enregistrées.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "la liste des types "
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id du type.
 *                       example: 1
 *                     typeEvent:
 *                       type: string
 *                       description: le type d'évènement.
 *                       example: "personel"
 *                     description:
 *                       type: string
 *                       description: description du type d'évènement.
 *                       example: "évènement de type restreint"
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
 * /type/editType:
 *   put:
 *     summary: Mettre à jour le type
 *     security:
 *          - bearerAuth: []
 *     description: Modifier le type dans la base de données.
 *     parameters:
 *          - name: id
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [Type]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               typeEvent:
 *                 type: string
 *                 description: le type d'évènement.
 *                 example: "personel"
 *               description:
 *                 type: string
 *                 description: description du type d'évènement.
 *                 example: "évènement de type restreint"
 *             required:
 *               - typeEvent
 *               - description
 *     responses:
 *       '200':
 *         description: Mise à jour du type avec l'ID.
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
 * /type/deleteType:
 *   delete:
 *     summary: Supprimer le type
 *     security:
 *          - bearerAuth: []
 *     description: Supprimer le type dans la base de données.
 *     parameters:
 *          - name: id
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [Type]
 *     responses:
 *       '200':
 *         description: Supprimer le type avec l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Suppression éffectuée"
 *       '400':
 *         description: type introuvable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ce type n'existe pas !"
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
typeRoute.post('/createType' , auth, validateSchema(createTypeSchema), TypeService.createType);
typeRoute.get('/getType' , TypeService.getTypeById);
typeRoute.get('/getAllType' , TypeService.getAllType);
typeRoute.put('/editType' , auth , TypeService.editType);
typeRoute.delete('/deleteType' , auth , TypeService.deleteType);

export default typeRoute;
