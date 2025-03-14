import { userModel } from '../Models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signUp = async (req, res) => {
    try {
        const { name, motherTongue, fluency, email, password, confirmPassword } = req.body;

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
                success: false
            });
        }

        const user = await userModel.findOne({ email });

        if (user) {
            return res.status(409).json({
                message: "Email already exists",
                success: false
            });
        }

        // Create new user
        const newUser = new userModel({ name, motherTongue, fluency, email, password });
        newUser.password = await bcrypt.hash(password, 10); // Hash password
        await newUser.save(); // Save the user

        res.status(201).json({
            message: "SignUp successful",
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};


export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        const errorMsg = "Auth failed, email or password is incorrect.";

        if (!user) {
            return res.status(403).json({
                message: errorMsg,
                success: false
            });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(401).json({
                message: errorMsg,
                success: false
            });
        }

        const jwtToken = jwt.sign(
            { 
                userId: user._id, 
                motherTongue: user.motherTongue,  
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }  // Options
        );
        

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            name: user.name
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};
