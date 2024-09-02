const express = require('express');
const userDb = require("./models/user");
const letterDb = require("./models/letter");
const projectDb = require("./models/project");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
require("dotenv").config()



console.log(process.env, "\n")

app.get("/", async(req, res) => {
    res.json("hello")
})


app.use(cors()); // Use CORS middleware to allow requests from the frontend
app.use(express.json());
app.use("/auth", authRoutes); // All the routes defined in auth.js will be prefixed with /api/auth

app.post("/editor", async(req, res) => {
    const { message, style } = req.body;


    if (message && style) {
        const data = { message, style };

        try {
            await letterDb.insertMany([data]);
            res.json("success");
        } catch (e) {
            console.error(e); 
            res.status(500).json("something really wrong");
        }
    } else {
        res.status(400).json("no data");
    }
})


app.listen(SERVER_PORT = process.env.SERVER_PORT, () => {
    console.log("port connected ", SERVER_PORT, "\n")
})