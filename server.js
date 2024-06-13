import express from "express"
import cors from "cors"
import db from "./models/index.js";
import productRouter from "./routes/productRoute.js";
import setupSwagger from "./swaggerConfig.js";
import userRouter from "./routes/userRoute.js";
import transactionRouter from "./routes/TransactionRoute.js";
import dotenv from "dotenv"
import cartRouter from "./routes/cartRoute.js";

dotenv.config()


// app config
const app = express()
const port = 4000

// middleware
app.use(express.json())
app.use(cors())

db.sequelize.sync()
.then(() => {
    console.log("Synced db.");
})
.catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

app.use("/api/products", productRouter)

app.use("/images", express.static('uploads'))

app.use("/api/users", userRouter)

app.use("/api/transactions", transactionRouter)

app.use("/api/carts", cartRouter)

app.get("/", (req, res) => {
    res.send("Welcome to Grocery Store API")
})

setupSwagger(app);

app.listen(port, () => {
    console.log(`Server is Running`)
})