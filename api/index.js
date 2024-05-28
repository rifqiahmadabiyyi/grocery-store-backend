import express from "express";
import cors from "cors";
import db from "../models/index.js";
import productRouter from "../routes/productRoute.js";

// app config
const app = express();
const port = 4000; // This is not used in serverless environment but kept for local dev

// middleware
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

app.get("/", (req, res) => {
    res.send("Welcome to Grocery Store API");
});

// Export the app as a module to be used in serverless function
export default app;