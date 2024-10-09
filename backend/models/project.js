const mongoose = require('mongoose');
require("dotenv").config()

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("mongodb connected | Projects");
})
.catch(()=>{
  console.log('failed');
})


const projectSchema = new mongoose.Schema({
  hmlContent: [
    {
      htmlContent: String,
    }
  ],
  projectSettings: {
    projectName: String,
    visibility: String,
    font: String,
    paragraphFontSize: Number,
    date: Date,
    users: [{ type: String }]
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model("Project", projectSchema);