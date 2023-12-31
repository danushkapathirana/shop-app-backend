const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

// route imports
const authenticationRoute = require("./routes/authentication")
const userRoute = require("./routes/user")
const productRoute = require("./routes/product")
const orderRoute = require("./routes/order")
const stripeRoute = require("./routes/stripe")
dotenv.config()

const app =  express()

mongoose.connect(process.env.MONGO_URL).
then(() => (
    console.log("DB Connection Successful!")
)).catch((err) => (
    console.log(err)
))

app.listen(process.env.PORT || 4000, () => {
    console.log("Server Started!")
})

// to send the json data via api
app.use(express.json())

app.use("/api/auth", authenticationRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)
app.use("/api/checkout", stripeRoute)

// libraries

// npm install express mongoose dotenv nodemon
// npm install crypto-js
// npm install strip
