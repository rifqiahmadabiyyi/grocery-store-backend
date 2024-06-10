const transactionModel = (sequelize, Sequelize) => {
    const Transaction = sequelize.define('Transaction', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        order_id: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        transaction_status: {
          type: Sequelize.STRING,
          allowNull: true
        },
        fraud_status: {
          type: Sequelize.STRING,
          allowNull: true
        },
        transaction_id: {
          type: Sequelize.STRING,
          allowNull: true
        },
        gross_amount: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        payment_type: {
          type: Sequelize.STRING,
          allowNull: true
        },
        transaction_time: {
          type: Sequelize.DATE,
          allowNull: true
        },
        va_numbers: {
          type: Sequelize.JSON,
          allowNull: true
        },
      }, {
        tableName: 'transactions',
      });

    return Transaction;
};

export default transactionModel;