import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const {token} = req.headers;
    if(!token) {
        return res.json({success: false, message:"Not Authorized Login Again"})
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        req.body.id = token_decode.id;
        next();
    } catch (err) {
        console.error('Error occurred while inserting products:', err);
        res.status(500).json({ message: 'Some error occurred while creating the data.' });
    }
}

export default authMiddleware;