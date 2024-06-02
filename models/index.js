import dbConfig from "../config/db.config.js";
import { Sequelize } from "sequelize";
import tutorialModel from "./tutorial.model.js";
import productModel from "./product.model.js";
import userModel from "./userModel.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {
  Sequelize,
  sequelize,
//   tutorials: tutorialModel(sequelize, Sequelize),
  products: productModel(sequelize, Sequelize),
  users: userModel(sequelize, Sequelize)
};

export default db;