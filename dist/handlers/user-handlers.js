import User from "../models/user.js";
import bcrypt from "bcrypt";
import { createToken } from "../libs/jwt-token-generator.js";
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ users });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exitingUser = await User.findOne({ email });
        if (exitingUser) {
            return res.status(401).json({ message: "User already registered" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        return res.status(201).json({ message: "Signed Up", user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not registered" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Incorrect Password" });
        }
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        res.clearCookie("jwt_token");
        res.cookie("jwt_token", token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
            sameSite: "none",
        });
        return res.status(200).json({ message: "Logged In Successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
//# sourceMappingURL=user-handlers.js.map