const express = require('express');
const userDb = require("./models/user");
const letterDb = require("./models/letter");
const projectDb = require("./models/project");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
require("dotenv").config()
const auth = require("./routes/auth")


console.log(process.env, "\n")

app.get("/", async(req, res) => {
    res.json("hello")
})


app.get("/auth/login", cors(), (req, res) => {
    res.json("auth")
})

app.post("/auth/login", async(req, res) => {
const { email, password } = req.body;
  try {
    const userDb = await User.findOne({ email });
    if (!userDb || !await bcrypt.compare(password, userDb.password)) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: userDb._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

app.post("/auth/signup", async(req, res) => {
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


app.listen(SERVER_PORT = process.env.SERVER_PORT, () => {
    console.log("port connected ", SERVER_PORT, "\n")
})