import { Router } from "express";
import packageService from "../services/packageService";

const packageRoute = Router()

/**
 * @swagger
 * tags:
 *   name: package
 *   description: Gestion des packages dans l'application.
 */

/**
 * @swagger
 * /package/getpackage/{id}:
 *   get:
 *     summary: Obtenir une package
 *     description: Récuperer l'package.
 *     parameters:
 *          - name: id
 *            in: path
 *            required: true
 *            scheme: 
 *              type: integer
 *     tags: [package]
 *     responses:
 *       '200':
 *         description: Le package correspondant à l'ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Le package trouvé "
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id du package.
 *                       example: 1
 *                     title:
 *                       type: string
 *                       description: nom du packag.
 *                       example: "pack akwaba"
 *                     image:
 *                       type: string
 *                       description: image du package.
 *                       example: "images/pack/bg-akwaba.jpg"
 *                     includes:
 *                       type: string
 *                       description: les elements incluent dans le pack
 *                       example: [ "string"]
 *                     bonus:
 *                       type: string
 *                       description: L'évènement associé à l'package.
 *                       example: [ "string"]
 *                     price:
 *                       type: number
 *                       description: prix du pack
 *                       example: 99.99
 *       '400':
 *         description: Erreur lors de la récupération.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Aucune package trouvé !"
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
 * /package/getAllpackage:
 *   get:
 *     summary: Obtenir la liste des packages
 *     description: Récuperer toutes les packages.
 *     tags: [package]
 *     responses:
 *       '200':
 *         description: Les packages enregistrées.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "la liste des packages "
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: id du package.
 *                       example: 1
 *                     title:
 *                       type: string
 *                       description: nom du packag.
 *                       example: "string"
 *                     image:
 *                       type: string
 *                       description: image du package.
 *                       example: "string"
 *                     includes:
 *                       type: string
 *                       description: les elements incluent dans le pack
 *                       example: [ "string"]
 *                     bonus:
 *                       type: string
 *                       description: L'évènement associé à l'package.
 *                       example: [ "string"]
 *                     price:
 *                       type: number
 *                       description: prix du pack
 *                       example: 99.99
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
 */
packageRoute.get('/getAllPackage' , packageService.getAllPackage);
packageRoute.get("/getPackage/:id" , packageService.getPackage);

export default packageRoute;