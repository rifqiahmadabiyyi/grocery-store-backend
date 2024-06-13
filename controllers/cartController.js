import db from "../models/index.js";

const User = db.users;

const addToCart = async (req, res) => {
    const id = req.body.id;
    const itemId = req.body.itemId;

    try {
        let userData = await User.findByPk(id);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData ? JSON.parse(userData.cartData) : {};

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        userData.cartData = JSON.stringify(cartData);
        await userData.save();

        res.json({ success: true, message: "Added to Cart" });
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while adding the Data."
        });
    }
};


const removeFromCart = async (req, res) =>{
    const id = req.body.id;
    const itemId = req.body.itemId;

    try {
        let userData = await User.findByPk(id);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData ? JSON.parse(userData.cartData) : {};

        if (cartData[itemId]) {
            if (cartData[itemId] > 1) {
                cartData[itemId] -= 1;
            } else {
                delete cartData[itemId];
            }

            userData.cartData = JSON.stringify(cartData);
            await userData.save();

            res.json({ success: true, message: "Removed from Cart" });
        } else {
            res.status(404).json({ success: false, message: "Item not found in cart" });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while removing the Data."
        });
    }
}

const getCart = async (req, res) => {
    const id = req.body.id;
    try {
        let userData = await User.findByPk(id);
        let cartData = await userData.cartData;
        res.json({success:true, cartData})
    } catch(err) {
        res.status(500).json({
            message: err.message || "Some error occurred while fetching the cart Data."
        });
    }
}

export {addToCart, removeFromCart, getCart}