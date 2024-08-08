import CategorieService from "../services/categorieService";
import { createCategorieSchema , updateCategorieSchema } from "../schema/categorieSchema";
import validateSchema from "../middlewares/validatorMiddleware";
import { Router } from "express";
import auth from "../middlewares/authMiddleware";
const categorieRoute = Router()

/**
 * @swagger
 * tags:
 *   name: Categorie
 *   description: Gestion des catégories dans l'application.
 */

/**
 * @swagger
 * /categorie/createCategorie:
 *   post:
 *     summary: Créer une catégorie
 *     security:
 *       - bearerAuth: []
 *     description: Ajoute une nouvelle catégorie dans la base de données.
 *     tags: [Categorie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom de la catégorie.
 *                 example: "string"
 *               description:
 *                 type: string
 *                 description: Description de la catégorie.
 *                 example: "string"
 *             required:
 *               - nom
 *               - description
 *     responses:
 *       '200':
 *         description: Catégorie créée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Catégorie créée avec succès !"
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
 * 
 * /categorie/getCategorie:
 *   get:
 *     summary: Obtenir une catégorie
 *     description: Récupérer une catégorie par son ID.
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID de la catégorie à récupérer.
 *     tags: [Categorie]
 *     responses:
 *       '200':
 *         description: La catégorie correspondant à l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Catégorie trouvée !"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID de la catégorie.
 *                       example: 1
 *                     nom:
 *                       type: string
 *                       description: Nom de la catégorie.
 *                       example: "Jeunesse"
 *                     description:
 *                       type: string
 *                       description: Description de la catégorie.
 *                       example: "Catégorie dédiée à la jeunesse"
 *       '404':
 *         description: Catégorie introuvable.
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
 *                   example: "Une erreur s'est produite lors du traitement !"
 * 
 * /categorie/getAllCategorie:
 *   get:
 *     summary: Obtenir toutes les catégories
 *     description: Récupérer la liste de toutes les catégories.
 *     tags: [Categorie]
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
 *                   example: "Liste des catégories récupérée avec succès !"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID de la catégorie.
 *                         example: 1
 *                       nom:
 *                         type: string
 *                         description: Nom de la catégorie.
 *                         example: "Jeunesse"
 *                       description:
 *                         type: string
 *                         description: Description de la catégorie.
 *                         example: "Catégorie dédiée à la jeunesse"
 *       '404':
 *         description: Aucune catégorie trouvée.
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
 *                   example: "Une erreur s'est produite lors du traitement !"
 * 
 * /categorie/editCategorie:
 *   put:
 *     summary: Mettre à jour une catégorie
 *     security:
 *       - bearerAuth: []
 *     description: Modifier une catégorie existante dans la base de données.
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID de la catégorie à mettre à jour.
 *     tags: [Categorie]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom de la catégorie.
 *                 example: "string"
 *               description:
 *                 type: string
 *                 description: Description de la catégorie.
 *                 example: "string"
 *             required:
 *               - nom
 *               - description
 *     responses:
 *       '200':
 *         description: Catégorie mise à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Mise à jour effectuée !"
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
 * 
 * /categorie/deleteCategorie:
 *   delete:
 *     summary: Supprimer une catégorie
 *     security:
 *       - bearerAuth: []
 *     description: Supprimer une catégorie existante dans la base de données.
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         schema:
 *           type: integer
 *           description: ID de la catégorie à supprimer.
 *     tags: [Categorie]
 *     responses:
 *       '200':
 *         description: Catégorie supprimée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Suppression effectuée !"
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
 *         description: Catégorie introuvable.
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
 *                   example: "Une erreur s'est produite lors du traitement !"
 */

categorieRoute.post("/createCategorie" , auth ,validateSchema(createCategorieSchema) , CategorieService.createCategorie);
categorieRoute.get('/getCategorie' , CategorieService.getCategorieById);
categorieRoute.get('/getAllCategorie' ,CategorieService.getAllCategorie);
categorieRoute.put('/editCategorie' , auth ,validateSchema(createCategorieSchema) , CategorieService.editCategorie);
categorieRoute.delete('/deleteCategorie' , auth , CategorieService.deleteCategorie);

export default categorieRoute;