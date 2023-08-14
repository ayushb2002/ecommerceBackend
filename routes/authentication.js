const express = require('express');
const bcrypt = require("bcryptjs"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens
const router = express.Router()
const {
    isLoggedIn
} = require("./middleware");

const SECRET = process.env.SECRET || "secret";

router.get("/register", async (req, res) => {
    res.status(200).json({
        "Message": "Send name, username and password in a post request"
    });
});

router.post('/register', async (req, res) => {
    const {
        User,
        Cart
    } = req.context.models;

    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });
        const saveUser = await user.save();

        const cart = new Cart({
            user: saveUser,
            count: 0,
            amount: 0,
            tax: 0,
            bill: 0
        });

        const saveCart = await cart.save();

        res.status(200).json({
            "message": "User created successfully!"
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

router.get("/login", async (req, res) => {
    res.status(200).json({
        "Message": "Send username and password in a post request"
    });
});

router.post("/login", async (req, res) => {
    try {
        const {
            User
        } = req.context.models;
        const user = await User.findOne({
            username: req.body.username
        });
        if (user) {
            //check if password matches
            const result = await bcrypt.compare(req.body.password, user.password);
            if (result) {
                // sign token and send it in response
                const token = await jwt.sign({
                    name: user.name,
                    username: user.username,
                    isAdmin: user.isAdmin
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
            error: error.message
        });
    }
});

router.get("/login", async (req, res) => {
    res.status(200).json({
        "Message": "Send username and password in a post request"
    });
});

router.post("/address", isLoggedIn, async (req, res) => {
    const {
        username,
        name,
        isAdmin
    } = req.user;

    const {
        User,
        Address
    } = req.context.models;

    try {
        const user = await User.findOne({
            username: username
        });

        const address = new Address({
            user: user,
            firstLine: req.body.firstLine,
            secondLine: req.body.secondLine,
            city: req.body.city,
            state: req.body.state,
            pincode: req.body.pincode
        });

        const saveAddress = await address.save();

        res.status(200).json({
            "message": "Successfully saved address!"
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }

});

router.get("/address", isLoggedIn, async (req, res) => {
    const {
        username,
        name,
        isAdmin
    } = req.user;

    const {
        User,
        Address
    } = req.context.models;

    try {
        const user = await User.findOne({
            username: username
        });

        const address = await Address.findOne({
            user: user
        });

        if (address) {
            res.status(200).json(address);
        } else {
            res.status(200).json({
                "message": "No previously saved address found."
            });
        }
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

module.exports = router;