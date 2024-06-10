import express from "express";
import { checkout, notification } from "../controllers/transactionController.js";

const transactionRouter = express.Router();


transactionRouter.post('/checkout', checkout)

transactionRouter.post('/notification', notification)

export default transactionRouter;