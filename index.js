require('dotenv').config();

const authenticationRoutes = require('./routes/authentication');
const ecommerceRoutes = require('./routes/ecommerce');
const express = require('express');
const morgan = require("morgan"); //import morgan
const { log } = require("mercedlogger"); // import mercedlogger's log function
const cors = require("cors");
const {createContext} = require("./routes/middleware")

const { PORT = 3000 } = process.env;

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

app.listen(PORT, () => {
    console.log(`Server Started at ${3000}`)
});
