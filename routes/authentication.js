const router = require("express").Router()
const CryptoJS = require("crypto-js")

const User = require("../models/User")

// Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.ENC_KEY).toString()
    })
    try {
        const savedUser = await newUser.save()
        res.status(201)
        res.json(savedUser)
    }
    catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

module.exports = router