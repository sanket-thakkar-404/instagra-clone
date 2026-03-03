const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require("path")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static("./public"))
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))

console.log("FRONTEND_URL:", process.env.FRONTEND_URL)

const authRoute = require('./routes/auth.routes')
const postRoute = require('./routes/post.routes')
const userRoute = require('./routes/user.routes')




app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/users', userRoute)


app.use("*name", (req, res) => {
    res.sendFile(path.join(__dirname , "../public/index.html"))
})


module.exports = app