const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
require('dotenv').config();

const auth =  async (req, res) => {
    const { email, password, } = req.body;
    const check= await User.findOne({email:email});
    
    if (!check) {
      return res.status(400).send("Invalid username or password.");
    };
  
    const validPassword = await bcrypt.compare(password, check.password);
  
    if (!validPassword) {
      return res.status(400).send("Invalid username or password.");
    };

    const accessToken = jwt.sign({ userId: check.id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15s"});
    const refreshToken = jwt.sign({ userId: check.id }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "1d"});
    const userToken = {userRefreshToken: refreshToken};
    const update = await User.findOneAndUpdate({email:email}, userToken);

    update.save();

    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    res.send({ accessToken });
  };

module.exports = { auth };