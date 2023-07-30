const {
    Router
} = require("express"); // import Router from express
const {
    isLoggedIn
} = require("./middleware"); // import isLoggedIn custom middleware

const router = Router();

router.get("/", isLoggedIn, async (req, res) => {
    const {
        username, isAdmin
    } = req.user;
    res.json({
        "loggedIn": true,
        "user": username,
        "admin": isAdmin
    });
});

module.exports = router