const PORT = process.env.PORT || 5000;
const express = require('express');
const userDb = require("./models/user");
const letterDb = require("./models/letter");
const projectDb = require("./models/project");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());


app.get("/login", cors(), (req, res) => {

})

app.post("/login", async(req, res) => {
    const{email, password}=req.body
    try {
        const check= await userDb.findOne({email:email})

        if(check) {
            res.json("exist")
        }

        else {
            res.json("notExist")
        }
    }
    catch (e){
        res.json("fail")
    }
})

app.post("/signup", async(req, res) => {
    const{email, password, username}=req.body
    const data={
        email:email,
        password:password,
        username:username
    }

    try {
        const check= await userDb.findOne({email:email})

        if(check) {
            res.json("exist")
        }

        else {
            res.json("notExist")
            await userDb.insertMany([data])
        }
    }
    catch (e){
        res.json("fail")
    }
})

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


app.listen(PORT, () => {
    console.log("port connected ", PORT)
})