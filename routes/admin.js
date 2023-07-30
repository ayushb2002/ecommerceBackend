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

module.exports = router