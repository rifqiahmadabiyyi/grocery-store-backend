import dbConfig from "../config/db.config.js";
import { Sequelize } from "sequelize";
import tutorialModel from "./tutorial.model.js";
import productModel from "./product.model.js";
import userModel from "./userModel.js";
import orderModel from "./order.model.js";
import orderItemModel from "./orderItems.model.js";
import transactionModel from "./transaction.model.js";

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
  users: userModel(sequelize, Sequelize),
  orders: orderModel(sequelize, Sequelize),
  orderItems: orderItemModel(sequelize, Sequelize),
  transactions: transactionModel(sequelize, Sequelize),
};

// // Order to OrderItems
// db.orders.hasMany(db.orderItems, { foreignKey: 'order_id' });
// db.orderItems.belongsTo(db.orders, { foreignKey: 'order_id'});

// // User to Order
// db.users.hasMany(db.orders, {foreignKey: 'user_id' });
// db.orders.belongsTo(db.users, {foreignKey: 'user_id' });

// // Order to Transaction
// db.orders.hasOne(db.transactions, { foreignKey: 'order_id' }); 
// db.transactions.belongsTo(db.orders, { foreignKey: 'order_id' });

export default db;