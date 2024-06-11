import express from "express";
import { checkout, notification } from "../controllers/transactionController.js";

const transactionRouter = express.Router();

/**
 * @swagger
 * /transactions/checkout:
 *   post:
 *     summary: Checkout Products
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *               order_id:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     quantity:
 *                       type: number
 *                     price:
 *                       type: number
 *               total_amount:
 *                 type: number
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Some server error
 */
transactionRouter.post('/checkout', checkout);

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         quantity:
 *           type: number
 *         price:
 *           type: number
 *     Transaction:
 *       type: object
 *       required:
 *         - user_id
 *         - order_id
 *         - items
 *         - total_amount
 *         - first_name
 *         - last_name
 *         - email
 *         - phone
 *       properties:
 *         user_id:
 *           type: number
 *           description: The ID of the user
 *         order_id:
 *           type: string
 *           description: The ID of the order
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Item'
 *         total_amount:
 *           type: number
 *           description: The total amount to be paid
 *         first_name:
 *           type: string
 *           description: The first name of the user
 *         last_name:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         phone:
 *           type: string
 *           description: The phone number of the user
 *       example:
 *         user_id: 1
 *         order_id: "order-1"
 *         items:
 *           - id: "item1"
 *             name: "Product 1"
 *             quantity: 2
 *             price: 50000
 *           - id: "item2"
 *             name: "Product 2"
 *             quantity: 1
 *             price: 100000
 *         total_amount: 200000
 *         first_name: "John"
 *         last_name: "Doe"
 *         email: "john.doe@example.com"
 *         phone: "08123456789"
 */

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: The transactions managing API
 */

transactionRouter.post('/notification', notification);

export default transactionRouter;
