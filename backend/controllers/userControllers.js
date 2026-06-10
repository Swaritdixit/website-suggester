const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        if (!username || !email || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }

        if (password.length < 6) {

            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });

        }

        const existingUser =
            await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "Email already exists"
            });

        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashedPassword
        });

        res.json({
            message: "User created successfully"
        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error creating user"
        });

    }

};

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "Invalid email or password"
            });

        }

        const match =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!match) {

            return res.status(400).json({
                message: "Invalid email or password"
            });

        }

        const token = jwt.sign(
            {
                userId: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.json({
            message: "Login successful",
            token
        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Login failed"
        });

    }

};