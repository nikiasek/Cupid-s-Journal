const mongoose = require('mongoose');
const connectDB = process.env.MONGO_URI || 'mongodb://localhost:27017/cupids_journal_db';

mongoose.connect(connectDB)
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