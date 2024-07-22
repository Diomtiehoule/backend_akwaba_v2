import { Router } from "express";
import SousCategorieService from "../services/sousCategorie";
import auth from "../middlewares/authMiddleware";

const sousCategorieRoute = Router();

/**
 * @swagger
 * /sousCategorie/createSousCategorie:
 *   post:
 *     summary: Ajouter un évènement
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
 *               typesousCategorie:
 *                 type: string
 *                 description: Le type d'évènement.
 *             required:
 *               - nom
 *               - dateDebut
 *               - dateFin
 *               - typesousCategorie
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
 * /sousCategorie/getSousCategorie:
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
 * /sousCategorie/getAllSousCategorie:
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
 * /sousCategorie/editSousCategorie:
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
 * /sousCategorie/deleteSousCategorie:
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
sousCategorieRoute.post('/createSousCategorie' , auth , SousCategorieService.createSousCategorie);
sousCategorieRoute.get('/getSousCategorie' , auth , SousCategorieService.getSousCategorieById);
sousCategorieRoute.get('/getAllSousCategorie' , auth , SousCategorieService.getAllSousCategorie);
sousCategorieRoute.put('/editSousCategorie' , auth , SousCategorieService.editSousCategorie);
sousCategorieRoute.delete('/deleteSousCategorie' , auth , SousCategorieService.deleteSousCategorie);

export default sousCategorieRoute;