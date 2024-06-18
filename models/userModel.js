const userModel = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
        type: Sequelize.STRING,
        allowNull: false,
        },
        email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        },
        role: {
        type: Sequelize.ENUM,
        values: ['admin', 'user'],
        allowNull: true,
        defaultValue: 'user',
        validate: {
            isIn: [['admin', 'user']]
        }
        },
        password: {
        type: Sequelize.STRING,
        allowNull: false
        },
        cartData: {
            type: Sequelize.JSON,
            default: {}
        }
    });
    
    return User;
    };
      
    export default userModel;