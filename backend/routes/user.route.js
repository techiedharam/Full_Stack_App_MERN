const express = require('express')
const userRouter = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model");
require("dotenv").config()

const auth = require("../middlewares/auth");
const checkAccess = require('../middlewares/checkAccess');
const blacklist = require('../blacklist');


// get all user  - Only admin can do this 
userRouter.get("/", auth, checkAccess("admin"), async (req, res) => {
    try {
        const AllUsers = await userModel.find()
        res.status(201).json(AllUsers)
        res.json({ message: "Only admin can access this info !" })
    } catch (error) {
        res.status(500).json({ message: "Error getting all users from db" })

    }
})

// user registration
userRouter.post("/register", async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            res.status(401).json("User Already Registere with this email. Try Another email to sign-up")
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new userModel({ username, password: hashedPassword, role });
        const savedUser = await newUser.save()
        res.status(201).json({
            message: "User Registered Successfully !",
            user: savedUser
        })
    } catch (error) {
        res.status(401).json({ message: `Error in registering user into db ${error}` })
    }
})

// user login  
userRouter.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body; // get the email and the password of exiting user
        const existingUser = await userModel.findOne({ username });
        if (!existingUser) {
            res.status(401).json({ message: "User Not Registered with this email id , PLz register first !" })
        }
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) {
            res.status(401).json({ message: "Wrong Password ! Try Again !" })
        }
        const token = jwt.sign(
            { _id: existingUser._id, role: existingUser.role },
            process.env.SECRET_KEY,
            { expiresIn: "24h" }
        );
        res.json({ msg: "Logedin Successfull !", token, userId: existingUser._id, role: existingUser.role })
    } catch (error) {
        res.status(401).json({ message: "Error in login user in db" })
    }
})

// Logout Route 
userRouter.get("/logout", (req, res) => {
    // const token = req.headers.authorization?.replace("Bearer ", "");
    // blacklist.push(token)
    res.send("User Logout Successfully ! ")
})


module.exports = userRouter