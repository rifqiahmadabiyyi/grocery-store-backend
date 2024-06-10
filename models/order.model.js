const orderModel = (sequelize, Sequelize) => {
    const Order = sequelize.define('Order', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        order_id: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        total_amount: {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      }, {
        tableName: 'orders'
      });

    return Order;
};
    
export default orderModel;