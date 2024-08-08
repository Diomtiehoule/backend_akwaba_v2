import { Router } from "express";
import SousCategorieService from "../services/sousCategorieService";
import { createSousCategorieSchema, updateSousCategorieSchema } from "../schema/sousCategorieSchema";
import validateSchema from "../middlewares/validatorMiddleware";
import auth from "../middlewares/authMiddleware";

const sousCategorieRoute = Router();

/**
 * @swagger
 * tags:
 *   name: SousCategorie
 *   description: Gestion des sous-catégories dans l'application.
 */

/**
 * @swagger
 * /sousCategorie/createSousCategorie:
 *   post:
 *     summary: Créer une sous-
 *     security:
 *          - bearerAuth: []
 *     description: Ajoute une nouvelle sous-catégorie dans la base de données.
 *     tags: [SousCategorie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: nom de la sous-catégorie.
 *                 example: "string"
 *               description:
 *                 type: string
 *                 description: description de la sous-catégorie .
 *                 example: "string"
 *             required:
 *               - nom
 *               - description
 *     responses:
 *       '200':
 *         description: sous-catégorie créé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "sous-catégorie créé !"
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
 * /sousCategorie/getSousCategorie:
 *   get:
 *     summary: Obtenir une sous-catégorie
 *     description: Récuperer la sous-catégorie.
 *     parameters:
 *          - name: id
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [SousCategorie]
 *     responses:
 *       '200':
 *         description: La sous-catégorie correspondant à l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "La sous-catégorie trouvée "
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id de la sous-catégorie.
 *                       example: 1
 *                     nom:
 *                       type: string
 *                       description: nom de la sous-catégorie.
 *                       example: "string"
 *                     description:
 *                       type: string
 *                       description: description de la sous-catégorie.
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
 *                   example: "Aucune sous-catégorie trouvée !"
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
 * /sousCategorie/getAllSousCategorie:
 *   get:
 *     summary: Obtenir la liste des sous-catégories
 *     description: Récuperer toutes les sous-catégories.
 *     tags: [SousCategorie]
 *     responses:
 *       '200':
 *         description: Les sous-catégories enregistrées.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "la liste des sous-catégories "
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
 * /sousCategorie/editSousCategorie:
 *   put:
 *     summary: Mettre à jour la sous-catégorie
 *     security:
 *          - bearerAuth: []
 *     description: Modifier la sous-catégorie dans la base de données.
 *     parameters:
 *          - name: id
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [SousCategorie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom de la sous-catégorie.
 *                 example: "football"
 *               description:
 *                 type: string
 *                 description: description de la sous-catégorie.
 *                 example: "affrontement des équipes 5 contre 5"
 *             required:
 *               - nom
 *               - description
 *     responses:
 *       '200':
 *         description: Mise à jour de la sous-catégorie avec l'ID.
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
 * /sousCategorie/deleteSousCategorie:
 *   delete:
 *     summary: Supprimer la sous-categorie
 *     security:
 *          - bearerAuth: []
 *     description: Supprimer la sous-categorie dans la base de données.
 *     parameters:
 *          - name: id
 *            in: query
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [SousCategorie]
 *     responses:
 *       '200':
 *         description: Supprimer la sous-categorie avec l'ID.
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
 *         description: sous-catégorie introuvable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cette sous-categorie n'existe pas !"
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
sousCategorieRoute.post('/createSousCategorie' , auth ,validateSchema(createSousCategorieSchema), SousCategorieService.createSousCategorie);
sousCategorieRoute.get('/getSousCategorie' , SousCategorieService.getSousCategorieById);
sousCategorieRoute.get('/getAllSousCategorie' , SousCategorieService.getAllSousCategorie);
sousCategorieRoute.put('/editSousCategorie' , auth ,validateSchema(updateSousCategorieSchema), SousCategorieService.editSousCategorie);
sousCategorieRoute.delete('/deleteSousCategorie' , auth , SousCategorieService.deleteSousCategorie);

export default sousCategorieRoute;