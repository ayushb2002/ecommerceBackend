const {
    Router
} = require("express"); // import Router from express
const {
    isLoggedIn
} = require("./middleware"); // import isLoggedIn custom middleware

const router = Router();

function calculateTax(price)
{
    return (price*0.18);
}

router.post("/category", isLoggedIn, async (req, res) => {
    try {
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

        const {
            Category
        } = req.context.models;

        const category = new Category({
            _id: req.body.categoryId,
            name: req.body.categoryName,
            keywords: req.body.categoryKeyword
        });

        const saveCategory = await category.save();

        res.status(200).json({
            "message": `${username} created a new category successfully`,
            saveCategory
        });
    } catch (err) {
        res.status(400).json({
            "error": err.message
        });
    }
});

router.post("/item", isLoggedIn, async (req, res) => {
    try {
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

        const {
            Category,
            Item
        } = req.context.models;

        const category = await Category.findOne({
            _id: req.body.categoryId
        })
        if (!category) {
            res.status(404).json({
                "error": "Category not found"
            });
            return;
        }

        const item = new Item({
            _id: req.body.itemId,
            name: req.body.itemName,
            description: req.body.itemDescription,
            price: req.body.itemPrice,
            category: category._id,
            tax: calculateTax(req.body.itemPrice)
        });

        const saveItem = await item.save();

        res.status(200).json({
            "message": `${username} added a new item successfully`,
            saveItem
        });
    } catch (err) {
        res.status(400).json({
            "error": err.message
        });
    }
});

module.exports = router