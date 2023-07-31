const {
    Router
} = require("express"); // import Router from express
const {
    isLoggedIn
} = require("./middleware"); // import isLoggedIn custom middleware

const router = Router();

router.get("/allCategories", isLoggedIn, async (req, res) => {

    const {
        Category
    } = req.context.models;

    try {
        const allCategories = await Category.find({});
        res.status(200).json(allCategories);
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

router.get("/category", isLoggedIn, async (req, res) => {

    const {
        Category
    } = req.context.models;

    try {
        const categories = await Category.findOne({
            _id: req.body.categoryId
        });
        res.status(200).json(categories);
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

router.get("/item", isLoggedIn, async (req, res) => {
    const {
        Item
    } = req.context.models;

    try {
        const items = await Item.findOne({
            _id: req.body.itemId
        });
        res.status(200).json(items);
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

router.get("/itemsByCategory", isLoggedIn, async (req, res) => {
    const {
        Item,
        Category
    } = req.context.models;

    try {
        const category = Category.findOne({
            _id: req.body.categoryId
        });
        if (!category) {
            res.status(404).json({
                "error": "Category not found"
            });
            return;
        }
        const items = await Item.find({
            category: category._id
        });
        res.status(200).json(items);
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

router.get("/allItems", isLoggedIn, async (req, res) => {
    const {
        Item
    } = req.context.models;

    try {
        const allItems = await Item.find({});
        res.status(200).json(allItems);
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

module.exports = router