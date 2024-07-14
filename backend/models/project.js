const mongoose = require('mongoose');
require("dotenv").config()

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("mongodb connected | Project");
})
.catch(()=>{
  console.log('failed');
})


const ProjectSchema = new mongoose.Schema({
    projectName : {type: String, required: true },
    content   : {type: Object, required: true }
});

module.exports = mongoose.model("Project", ProjectSchema);