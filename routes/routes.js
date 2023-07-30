const express = require('express');
const User = require('../models/user');

const router = express.Router()

//Post Method
router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const saveUser = await user.save();
        res.status(200).json(saveUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//Get all Method
router.get('/getAll', (req, res) => {
    res.send('Get All API')
});

//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

module.exports = router;