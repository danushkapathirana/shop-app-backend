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
        res.status(201).json(savedUser)
    }
    catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

// Login
router.get("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        })
        if(!user) {
            return user && res.status(401).json("Wrong credentials!")
        }

        const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.ENC_KEY).toString(CryptoJS.enc.Utf8)
        if(decryptedPassword !== req.body.password) {
            return res.status(401).json("Wrong credentials!")
        }

        // user info saved on _doc inside mongodb, so if you send the following line it will send whole document
        // const { password, ...otherInfo} = user
        const { password, ...otherInfo} = user._doc
        res.status(200).json(otherInfo)
    }
    catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
