import CategorieService from "../services/categorieService";
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
 *     summary: Créer une adresse
 *     description: Ajoute un nouvel événement dans la base de données.
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
 *                 description: Catégorie de l'évènement.
 *                 example: "Sport"
 *               description:
 *                 type: string
 *                 description: description de la catégorie .
 *                 example: "activité sportive des moins de 20ans"
 *             required:
 *               - nom
 *               - description
 *     responses:
 *       '200':
 *         description: Catégorie créé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Catégorie créé !"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id de la catégorie.
 *                       example: 1
 *                     nom:
 *                       type: string
 *                       description: nom de la catégorie.
 *                       example: "jeunesse"
 *                     description:
 *                       type: string
 *                       description: description de la catégorie.
 *                       example: "catégorie dédié à la jeunesse"
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
 * /categorie/getCategorie:
 *   get:
 *     summary: Obtenir une catégorie
 *     description: Récuperer la catégorie.
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
 *                   example: "La catégorie trouvée "
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id de la catégorie.
 *                       example: 1
 *                     nom:
 *                       type: string
 *                       description: categorie de l'évènement.
 *                       example: "jeunesse"
 *                     description:
 *                       type: number
 *                       description: description de la catégorie.
 *                       example: "catégorie dédié à la jeunesse"
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
 * /categorie/getAllCategorie:
 *   get:
 *     summary: Obtenir la liste des catégories
 *     description: Récuperer toutes les catégories.
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
 *                       example: "jeunesse"
 *                     description:
 *                       type: string
 *                       description: description de la catégorie.
 *                       example: "catégorie dédié à la jeunesse"
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
 * /categorie/editCategorie:
 *   put:
 *     summary: Mettre à jour la catégorie
 *     description: Modifier la catégorie dans la base de données.
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
 *                 description: Catégorie de l'évènement.
 *                 example: "fonctionnaire"
 *               description:
 *                 type: string
 *                 description: description de la catégorie.
 *                 example: "catégorie dédiée aux fonctionnaire"
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
 * /categorie/deleteCategorie:
 *   delete:
 *     summary: Supprimer la catégorie
 *     description: Supprimer la catégorie dans la base de données.
 *     tags: [Categorie]
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
 *       '400':
 *         description: catégorie introuvable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cette catégorie n'existe !"
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
categorieRoute.post("/createCategorie" , auth , CategorieService.createCategorie);
categorieRoute.get('/getCategorie' , CategorieService.getCategorieById);
categorieRoute.get('/getAllCategorie' ,CategorieService.getAllCategorie);
categorieRoute.put('/editCategorie' , auth , CategorieService.editCategorie);
categorieRoute.delete('/deleteCategorie' , auth , CategorieService.deleteCategorie);

export default categorieRoute;