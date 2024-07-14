const mongoose = require('mongoose');
require("dotenv").config()

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("mongodb connected | Letter");
})
.catch(()=>{
  console.log('failed');
})


const LetterSchema = new mongoose.Schema({
    message : {type: String, required: true },
    style   : {type: String, required: true }
});

module.exports = mongoose.model("Letter", LetterSchema);