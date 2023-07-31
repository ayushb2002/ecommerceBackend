const {
    Router
} = require("express"); // import Router from express
const {
    isLoggedIn
} = require("./middleware"); // import isLoggedIn custom middleware

const router = Router();

router.get("/orders", isLoggedIn, async (req, res) => {
    const { Order } = req.context.models;

    try {
        const allOrders = await Order.find({});
        res.status(200).json(allOrders);
    }
    catch (err)
    {
        res.status(400).json({
            error: err.message
        });
    }
});

router.post("/promote", isLoggedIn, async (req, res) => {
    try {
        const {
            currentUser
        } = req.user;
        const {
            User
        } = req.context.models;
        const user = await User.findOne({
            username: currentUser
        });
        if (user.isAdmin) {
            await User.findOneAndUpdate({
                "username": req.body.username
            }, {
                "isAdmin": true
            }, {
                upsert: true
            }, (err, doc) => {
                if (err) return res.send(500, {
                    error: err
                });
                return res.status(200).json({
                    "message": "Successfully promoted!"
                });
            })
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