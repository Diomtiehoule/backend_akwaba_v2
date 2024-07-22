import CategorieService from "../services/categorieService";
import { Router } from "express";
import auth from "../middlewares/authMiddleware";
const categorieRoute = Router()

/**
 * @swagger
 * /categorie/createCategorie:
 *   post:
 *     summary: Ajouter une catégorie
 *     description: Ajoute un nouvel évènement dans la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Le nom de l'évènement.
 *               description:
 *                 type: string
 *                 description: Description de l'évènement.
 *               dateDebut:
 *                 type: string
 *                 format: date
 *                 description: Date de début de l'évènement (format YYYY-MM-DD).
 *               dateFin:
 *                 type: string
 *                 format: date
 *                 description: Date de fin de l'évènement (format YYYY-MM-DD).
 *               typeEvent:
 *                 type: string
 *                 description: Le type d'évènement.
 *             required:
 *               - nom
 *               - dateDebut
 *               - dateFin
 *               - typeEvent
 *     responses:
 *       '201':
 *         description: Évènement créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès.
 *                   example: "Évènement créé avec succès."
 *       '401':
 *         description: Erreur au niveau du token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 *                   example: "Action non-autorisée."
 *       '400':
 *         description: Erreur lors de la création de l'évènement.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 *                   example: "Veuillez remplir tout les champs."
 */

/**
 * @swagger
 * /categorie/getCategorie:
 *   get:
 *     summary: Obtenir un évènement
 *     description: Trouver un évènement grâce à son id.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Adresse email de l'administrateur.
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'administrateur (minimum 6 caractères).
 *                 minLength: 6
 *     responses:
 *       '200':
 *         description: Connexion réussie. Retourne un token d'authentification JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès.
 *                   example: "Le type d'évènement trouvé."
 *                 data:
 *                   type: object
 *                    
 *       '400':
 *         description: Adresse email ou mot de passe incorrect.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 *                   example: "Adresse email ou mot de passe incorrect."
 */
/**
 * @swagger
 * /categorie/getAllCategorie:
 *   get:
 *     summary: Connexion d'un administrateur
 *     description: Connecte un administrateur en vérifiant les informations d'identification dans la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Adresse email de l'administrateur.
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'administrateur (minimum 6 caractères).
 *                 minLength: 6
 *     responses:
 *       '200':
 *         description: Connexion réussie. Retourne un token d'authentification JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès.
 *                   example: "Connexion réussie."
 *                 token:
 *                   type: string
 *                   description: Token d'authentification JWT.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: Adresse email ou mot de passe incorrect.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 *                   example: "Adresse email ou mot de passe incorrect."
 */
/**
 * @swagger
 * /categorie/editCategorie:
 *   put:
 *     summary: Connexion d'un administrateur
 *     description: Connecte un administrateur en vérifiant les informations d'identification dans la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Adresse email de l'administrateur.
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'administrateur (minimum 6 caractères).
 *                 minLength: 6
 *     responses:
 *       '200':
 *         description: Connexion réussie. Retourne un token d'authentification JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès.
 *                   example: "Connexion réussie."
 *                 token:
 *                   type: string
 *                   description: Token d'authentification JWT.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: Adresse email ou mot de passe incorrect.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 *                   example: "Adresse email ou mot de passe incorrect."
 */
/**
 * @swagger
 * /event/deleteCategorie:
 *   delete:
 *     summary: Connexion d'un administrateur
 *     description: Connecte un administrateur en vérifiant les informations d'identification dans la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Adresse email de l'administrateur.
 *               password:
 *                 type: string
 *                 description: Mot de passe de l'administrateur (minimum 6 caractères).
 *                 minLength: 6
 *     responses:
 *       '200':
 *         description: Connexion réussie. Retourne un token d'authentification JWT.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message de succès.
 *                   example: "Connexion réussie."
 *                 token:
 *                   type: string
 *                   description: Token d'authentification JWT.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: Adresse email ou mot de passe incorrect.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 *                   example: "Adresse email ou mot de passe incorrect."
 */
categorieRoute.post("/createCategorie" , auth , CategorieService.createCategorie);
categorieRoute.get('/getCategorie' , CategorieService.getCategorieById);
categorieRoute.get('/getAllCategorie' ,CategorieService.getAllCategorie);
categorieRoute.put('/editCategorie' , auth , CategorieService.editCategorie);
categorieRoute.delete('/deleteCategorie' , auth , CategorieService.deleteCategorie);

export default categorieRoute;