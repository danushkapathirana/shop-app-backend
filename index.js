const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

// route imports
const userRoute = require("./routes/user")

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

app.use("/api/users", userRoute)

// libraries

// npm install express mongoose dotenv nodemon
