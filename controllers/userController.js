import db from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const User = db.users;

const createToken = async (id) => {
    return jwt.sign({id: id}, "test")
}

const loginUser = async (req, res) => {

}

const registerUser = async (req, res) => {
    const {username, password, email} = req.body;
    try {
        const exists = await User.findOne({ where: { email } })
        if(exists) {
            return res.json({
                success: false,
                message: "User Already exists"
            })
        }

        if(!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid email."
            })
        }

        if(password.length<8) {
            return res.json({
                success: false,
                message: "Password must be strong and have more than 8 characters."
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = {
            username:username,
            email:email,
            password:hashedPassword,
        }

        const user = await User.create(newUser)
        const token = await createToken(user.id)
        res.json({
            success:true,
            token
        })

    } catch (err) {
        res.status(500).json({
        message:
            err.message || "Some error occurred while registering the User."
        })
        // console.log(err);
        // res.json
    }
}


export {loginUser, registerUser}