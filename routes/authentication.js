const express = require('express');
const bcrypt = require("bcryptjs"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens
const router = express.Router()

const {
    SECRET = "secret"
} = process.env;

//Post Method
router.post('/register', async (req, res) => {
    const { User } = req.context.models;
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        const saveUser = await user.save();
        res.status(200).json(saveUser);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { User } = req.context.models;
        const user = await User.findOne({
            username: req.body.username
        });
        if (user) {
            //check if password matches
            const result = await bcrypt.compare(req.body.password, user.password);
            if (result) {
                // sign token and send it in response
                const token = await jwt.sign({
                    username: user.username
                }, SECRET);
                res.json({
                    token
                });
            } else {
                res.status(400).json({
                    error: "Password doesn't match"
                });
            }
        } else {
            res.status(400).json({
                error: "User doesn't exist!"
            });
        }
    } catch (error) {
        res.status(400).json({
            error:error.message
        });
    }
});

module.exports = router;