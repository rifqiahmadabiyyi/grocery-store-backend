const orderItemModel = (sequelize, Sequelize) => {
    const OrderItem = sequelize.define('OrderItem', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        order_id: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        item_id: {
          type: Sequelize.STRING,
          allowNull: false
        },
        item_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      }, {
        tableName: 'order_items'
      });
    return OrderItem;
};
    
export default orderItemModel;