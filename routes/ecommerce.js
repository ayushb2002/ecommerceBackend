const {
    Router
} = require("express"); // import Router from express
const {
    isLoggedIn
} = require("./middleware"); // import isLoggedIn custom middleware

const router = Router();

router.get("/", isLoggedIn, async (req, res) => {
    const {
        username,
        isAdmin
    } = req.user;
    res.json({
        "loggedIn": true,
        "user": username,
        "admin": isAdmin
    });
});

router.post("/addItem", isLoggedIn, async (req, res) => {
    const {
        username,
        isAdmin
    } = req.user;

    try {
        const {
            User,
            Cart,
            Item
        } = req.context.models;
        const user = await User.findOne({
            username: username
        });
        const item = await Item.findOne({
            _id: req.body.itemId
        });

        const _item = {
            item: item,
            count: req.body.count,
            cost: item.price
        };

        Cart.findOne({
            user: user
        }).then((cart) => {
            if (!cart) {
                res.send(500, {
                    "error": "Server error!"
                });
            }

            cart.items.push(_item);
            cart.count = cart.items.length;
            cart.amount = cart.items.reduce((total, item_) => total + item_.count * item_.cost, 0);
            cart.save().then(savedCart => {
                    console.log("Item added to cart successfully!");
                    console.log(savedCart);
                })
                .catch(error => {
                    console.error("Error saving cart:", error);
                    res.send(500, { "error": "Server error!" });
                    return;
                });
        }).catch(error => {
            console.error("Error finding cart:", error);
            res.send(500, { "error": "Server error!" });
        });

        res.status(200).json({
            "message": "Added item to cart successfully!"
        });
        
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }

});

module.exports = router