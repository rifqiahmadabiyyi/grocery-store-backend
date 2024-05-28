const productModel = (sequelize, Sequelize) => {
const Product = sequelize.define("product", {
    name: {
    type: Sequelize.STRING,
    required: true,
    },
    description: {
    type: Sequelize.STRING,
    required: true,
    },
    price: {
    type: Sequelize.INTEGER,
    required: true,
    },
    image: {
        type: Sequelize.STRING,
        required: false,
    },
    category: {
        type: Sequelize.STRING
    }
});

return Product;
};
  
export default productModel;