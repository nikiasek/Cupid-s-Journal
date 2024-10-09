const User = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    try {
      const { username, password, email } = req.body;
  
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists." });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = new User({
        username,
        password: hashedPassword,
        email
      });
  
      const savedUser = await user.save();
      res.json({
        message: "User registered successfully",
        userId: savedUser._id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

module.exports = { register };