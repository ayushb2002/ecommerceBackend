const {
    Router
} = require("express"); // import Router from express
const {
    isLoggedIn
} = require("./middleware"); // import isLoggedIn custom middleware

const router = Router();

router.get("/category", isLoggedIn, async (req, res, next) => {

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

    const { Category } = req.context.models;

    try {
        await Category.remove({ _id: req.body.categoryId }, (err) => {
            if (err)
            {
                res.status(400).json({
                    error: err.message
                });
                return;
            }
        });
        
        res.status(200).json({
            "message": "Category removed successfully"
        });
    }
    catch (err)
    {
        res.status(400).json({
            error: err.message
        });
    }
});

router.get("/items", isLoggedIn, async (req, res) => {

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

module.exports = router