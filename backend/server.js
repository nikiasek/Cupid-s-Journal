const PORT = process.env.PORT || 5000;
const express = require('express');
const db = require("./models/user")
const cors = require("cors")
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())


app.get("/login", cors(), (req, res) => {

})

app.post("/login", async(req, res) => {
    const{email, password}=req.body
    try {
        const check= await db.findOne({email:email})

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
    const{email, password}=req.body
    const data={
        email:email,
        password:password
    }

    try {
        const check= await db.findOne({email:email})

        if(check) {
            res.json("exist")
        }

        else {
            res.json("notExist")
            await db.insertMany([data])
        }
    }
    catch (e){
        res.json("fail")
    }
})

app.listen(PORT, () => {
    console.log("port connected ", PORT)
})