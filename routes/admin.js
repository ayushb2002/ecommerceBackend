const {
    Router
} = require("express"); // import Router from express
const {
    isLoggedIn
} = require("./middleware"); // import isLoggedIn custom middleware

const router = Router();

router.get("/orders", isLoggedIn, async (req, res) => {
    const {
        Order
    } = req.context.models;
    const {
        username,
        isAdmin,
        name
    } = req.user;
    if (isAdmin) {
        try {
            const allOrders = await Order.find({});
            res.status(200).json(allOrders);
        } catch (err) {
            res.status(400).json({
                error: err.message
            });
        }
    } else {
        res.status(404).json({
            "error": "Operation not allowed!"
        });
    }
});

router.post("/promote", isLoggedIn, async (req, res) => {
    try {
        const {
            username,
            isAdmin,
            name
        } = req.user;
        const {
            User
        } = req.context.models;

        if (isAdmin) {
            await User.findOneAndUpdate({
                "username": req.body.username
            }, {
                "isAdmin": true
            }, {
                upsert: true
            });
            return res.status(200).json({
                "message": "Successfully promoted!"
            });
        } else {
            res.status(400).json({
                error: "Not allowed!"
            });
        }
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

module.exports = router