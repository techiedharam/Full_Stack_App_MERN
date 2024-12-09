const express = require("express")
const connectDB = require("./config/db")
const userRouter = require('./routes/user.route');
const blogRouter = require("./routes/blog.route")
const port = 8000
const app = express()

// Body Parser here 
app.use(express.json())

// // User Route 
app.use("/users", userRouter)

// Blog Route
app.use("/blogs", blogRouter)


app.get("/health", (req, res) => {
    res.send("health route is working fine !")
})


app.listen(port, async () => {
    await connectDB()
    console.log(`Your Full Stack App is running on ${port} !`);
})