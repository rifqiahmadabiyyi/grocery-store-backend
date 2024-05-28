import express from "express";
import cors from "cors";
import db from "../models/index.js";
import productRouter from "../routes/productRoute.js";
import setupSwagger from "../swaggerConfig.js";
import dotenv from "dotenv";

// Load environment variables
// dotenv.config();

// App config
const app = express();
// const port = 4000; // Not used in serverless environment but kept for local dev

// Middleware
app.use(express.json());
app.use(cors());

db.sequelize.sync()
.then(() => {
    console.log("Synced db.");
})
.catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

app.use("/api/products", productRouter);
app.use("/images", express.static('uploads'));

setupSwagger(app);
app.get("/", (req, res) => {
    res.send("Welcome to Grocery Store API");
});

// Export the app as a module
export default app;