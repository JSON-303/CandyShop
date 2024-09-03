import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserController = {

    "register": async (req, res) => {
        try {
            const newUser = await UserModel.create(req.body)

            const userToken = jwt.sign({ "id": newUser._id }, process.env.SECRET_KEY)

            return res
                .cookie("userToken", userToken, { "httpOnly": true })
                .status(201)
                .json(newUser)
        } catch (err) {
            console.log(err)
            return res.status(400).json(err)
        }
    },

    "login": async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await UserModel.findOne({ username });

            if (!user) {
                const error = new Error();
                error.errors = {
                    username: {
                        message: "Invalid Username or Password."
                    }
                };
                return res.status(400).json(error);
            }

            const isCorrectPassword = await bcrypt.compare(password, user.password);

            if (!isCorrectPassword) {
                const error = new Error();
                error.errors = {
                    password: {
                        message: "Invalid Username or Password"
                    }
                };
                return res.status(400).json(error);
            }

            const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

            return res
                .cookie("userToken", userToken, { httpOnly: true })
                .status(200)
                .json({ msg: "Login successful." });

        } catch (err) {
            console.log(err);
            return res.status(400).json({
                errors: {
                    general: {
                        message: "An error occurred during login. Please try again."
                    }
                }
            });
        }
    },

    "logout": async (req, res) => {
        res.clearCookie("userToken")
        return res.status(200).json({ "msg": "Logout successful" });
    },

    "editUser": async (req, res) => {
        const userId = req.params.id;
        const { username, email, password } = req.body;

        try {
            const updatedUser = await UserModel.findOneAndUpdate(
                { _id: userId },

                { username, email, password },
                { runValidators: true, new: true }
            );

            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(404).json({ message: "User not found!" });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    },

    "getOneUser": async (req, res) => {
        try {
            const oneUser = await UserModel.findById(req.params.id)
            res.json(oneUser)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

    "getAllUsers": async (req, res) => {
        try {
            const allUsers = await UserModel.find()
            res.json(allUsers)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    },

    "deleteUserById": async (req, res) => {
        const userId = req.params.id;

        try {
            const deletedUser = await UserModel.findOneAndDelete({ _id: userId });

            if (deletedUser) {
                res.json(deletedUser);
            } else {
                res.status(400).json({ message: "User not found." });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }
}

export default UserController;