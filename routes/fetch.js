const {
    Router
} = require("express"); // import Router from express
const {
    isLoggedIn
} = require("./middleware"); // import isLoggedIn custom middleware

const router = Router();

router.get("/allCategories", isLoggedIn, async (req, res) => {

    const { Category } = req.context.models;

    try {
        const allCategories = await Category.find({});
        res.status(200).json(allCategories);
    }
    catch (err)
    {
        res.status(400).json({
            error: err.message
        });
    }
});

router.get("/categories", isLoggedIn, async (req, res) => {

    const { Category } = req.context.models;

    try {
        const categories = await Category.findOne({_id: req.body.categoryId});
        res.status(200).json(categories);
    }
    catch (err)
    {
        res.status(400).json({
            error: err.message
        });
    }
});

router.get("/items", isLoggedIn, async (req, res) => {
    const { Item } = req.context.models;

    try {
        const items = await Item.findOne({_id: req.body.itemId});
        res.status(200).json(items);
    }
    catch (err)
    {
        res.status(400).json({
            error: err.message
        });
    }
});

router.get("/allItems", isLoggedIn, async (req, res) => {
    const { Item } = req.context.models;

    try {
        const allItems = await Item.find({});
        res.status(200).json(allItems);
    }
    catch (err)
    {
        res.status(400).json({
            error: err.message
        });
    }
});

module.exports = router