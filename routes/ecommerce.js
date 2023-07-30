const {
    Router
} = require("express"); // import Router from express
const {
    isLoggedIn
} = require("./middleware"); // import isLoggedIn custom middleware
const Cart = require("../models/cart");

const router = Router();

router.get("/", isLoggedIn, async (req, res) => {
    const {
        username,
        name,
        isAdmin
    } = req.user;
    res.json({
        "loggedIn": true,
        "user": username,
        "name": name,
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

        if (!user || !item)
        {
            res.status(400).json({ "message": "Invalid user id or item id" });
            return;
        }

        const _item = {
            item: item._id,
            itemCount: req.body.count,
            costPerItem: item.price,
            taxPerItem: item.taxPerItem
        };

        Cart.findOne({
            user: user
        }).then((cart) => {
            if (!cart) {
                res.status(500).json({
                    "error": "Server error!"
                });
                return;
            }

            cart.items.push(_item);
            cart.count = cart.items.length;
            cart.amount += (req.body.count * _item.costPerItem);
            cart.tax += (req.body.count * _item.taxPerItem);
            cart.bill = cart.amount + cart.tax;
            cart.save().then((savedCart) => {
                    console.log(savedCart);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({
                        "error": "Server error!"
                    });
                    return;
                });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({
                "error": "Server error!"
            });
            return;
        });

        res.status(200).json({
            "message": "Added item to cart successfully!"
        });
        return;
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }

});

router.get("/fetchCart", isLoggedIn, async (req, res) => {
    const {
        username,
        name,
        isAdmin
    } = req.user;

    try {
        const {
            Cart,
            User
        } = req.context.models;
        const user = await User.findOne({
            username: username
        });
        const cart = await Cart.findOne({
            user: user
        });
        res.status(200).json({
            "name": name,
            "items": cart.items,
            "numberOfUniqueItems": cart.count,
            "billWithoutTaxes": cart.amount,
            "totalTaxes": cart.tax,
            "billWithTaxes": cart.bill
        });
    } catch (err) {
        res.status(400).json({
            "error": err.message
        });
    }

});

router.post("/removeItem", isLoggedIn, async (req, res) => {
    const {
        username,
        name,
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
        const cart = await Cart.findOne({
            user: user
        });

        cart.deleteItemById(item._id).then(updatedCart => {
            console.log(updatedCart);
        }).catch(err => { 
            res.status(400).json({"error": err.message});
        });
        
        res.status(200).json({ "success": true })
    }
    catch (err) {
        res.status(400).json({"error": err.message});
    }
});

router.post("/emptyCart", isLoggedIn, async (req, res) => {
    const {
        username,
        name,
        isAdmin
    } = req.user;

    try {
        const {
            User,
            Cart,
        } = req.context.models;
        const user = await User.findOne({
            username: username
        });
        
        Cart.deleteOne({ user: user }).then(async () => {
            const cart = new Cart({
                user: user,
                count: 0,
                amount: 0,
                tax: 0,
                bill: 0
            });
    
            const saveCart = await cart.save();
            console.log(saveCart);
        }).catch(err => {
            res.status(400).json({ "error": err.message });
        });
        
        res.status(200).json({ "success": true })
    }
    catch (err) {
        res.status(400).json({"error": err.message});
    }
});

module.exports = router