const {
    Router
} = require("express"); // import Router from express
const {
    isLoggedIn
} = require("./middleware"); // import isLoggedIn custom middleware

const router = Router();

router.post("/category", isLoggedIn, async (req, res, next) => {
    const { username, isAdmin, name } = req.user;

    if (!isAdmin) {
        res.status(403).json({ "error": "Operation not allowed. Admin privileges required." });
        return;
    }

    const { Category, Item } = req.context.models;

    try {
        const deletedCategory = await Category.deleteOne({ _id: req.body.categoryId });
        
        if (deletedCategory.deletedCount === 0) {
            res.status(404).json({ "error": "Category not found." });
            return;
        }

        const result = await Item.deleteMany({ category: req.body.categoryId });
        res.status(200).json({ "message": "Category removed successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ "error": "Internal server error." });
    }
});

router.post("/itemsOfCategory", isLoggedIn, async (req, res) => {

    const {
        username,
        isAdmin
    } = req.user;

    if (!isAdmin) {
        res.status(400).json({
            "error": "Operation not allowed"
        });
        return;
    }

    const { Item, Category } = req.context.models;

    try {
        const category = await Category.findOne({ _id: req.body.categoryId });
        
        if (!category) {
            res.status(404).json({ "error": "Category not found" });
            return;
        }

        const result = await Item.deleteMany({ category: category._id });

        if (result.deletedCount === 0) {
            res.status(404).json({ "error": "No items found for the specified category" });
            return;
        }

        res.status(200).json({ "message": "Removed all items successfully!" });
    }
    catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

router.post("/item", isLoggedIn, async (req, res) => {

    const {
        username,
        isAdmin
    } = req.user;

    if (!isAdmin) {
        res.status(400).json({
            "error": "Operation not allowed"
        });
        return;
    }

    const { Item } = req.context.models;

    try {
        const removedItem = await Item.findOneAndRemove({ _id: req.body.itemId }).exec();
        
        if (!removedItem) {
            res.status(404).json({ "error": "Item not found" });
            return;
        }

        res.status(200).json({ "message": "Removed the item successfully!" });
    }
    catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

module.exports = router