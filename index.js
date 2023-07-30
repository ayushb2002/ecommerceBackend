require('dotenv').config();

const authenticationRoutes = require('./routes/authentication');
const ecommerceRoutes = require('./routes/ecommerce');
const createRoutes = require('./routes/create');
const fetchRoutes = require('./routes/fetch');
const removeRoutes = require('./routes/remove');
const adminRoutes = require('./routes/admin');
const express = require('express');
const morgan = require("morgan"); //import morgan
const {
    log
} = require("mercedlogger"); // import mercedlogger's log function
const cors = require("cors");
const {
    createContext
} = require("./routes/middleware")

const {
    PORT = 3000
} = process.env;

const app = express();

app.use(cors()); // add cors headers
app.use(morgan("tiny")); // log the request for debugging
app.use(express.json()); // parse json bodies
app.use(createContext) // create req.context

app.get("/", (req, res) => {
    res.send("this is the test route to make sure server is working")
});

app.use('/user', authenticationRoutes);
app.use('/shop', ecommerceRoutes);
app.use('/create', createRoutes);
app.use('/fetch', fetchRoutes);
app.use('/remove', removeRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
});