const router = require("express").Router()

const User = require("../models/User")
const { verifyTokenAndAuthorization } = require("./verifyToken")

// Update
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.ENC_KEY).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{new: true})
        res.status(200).json(updatedUser)
    }
    catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router
