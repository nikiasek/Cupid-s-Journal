const mongoose = require('mongoose');
const connectDB = process.env.MONGO_URI || 'mongodb://localhost:27017/cupids_journal_db';

mongoose.connect(connectDB)
.then(()=>{
  console.log("mongodb connected");
})
.catch(()=>{
  console.log('failed');
})


const EditorSchema = new mongoose.Schema({
    message : {type: String, required: true } ,
    style   : {type: String, required: true }
});

module.exports = mongoose.model("Editor", EditorSchema);