const express = require('express');
const projectDb = require("./models/project");
const cors = require("cors");
const corsOptions = require("./config/corsOption")
const cookieParser = require('cookie-parser');
const verifyJWT = require("./middleware/verifyJWT")

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
require("dotenv").config()
//app.use(credentials);
app.use(cors(corsOptions.corsOptions));
app.use(cookieParser());





console.log(process.env, "\n")

app.get("/", async(req, res) => {
    res.json("hello")
})


// routes
app.use('/auth/register', require('./routes/register'));
app.use('/auth/login', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/auth/logout', require('./routes/logout'));


app.use(verifyJWT);
app.use('/projects/browser', require('./routes/api/projectBrowser')); // databáze
app.use("/projects/editor"  , require("./routes/api/projectEditor")); // edit project

app.listen(SERVER_PORT = process.env.SERVER_PORT, () => {
    console.log("port connected ", SERVER_PORT, "\n")
})