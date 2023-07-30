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

router.get("/items", isLoggedIn, async (req, res) => {
    const { Item, Category } = req.context.models;

    try {
        const category = await Category.find({ name: req.body.categoryName });
        const allItems = await Item.find({category: category});
        res.status(200).json(allItems);
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