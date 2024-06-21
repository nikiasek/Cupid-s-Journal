const mongoose = require('mongoose');
const connectDB = process.env.MONGO_URI || 'mongodb://localhost:27017/cupids_journal_db';

mongoose.connect(connectDB)
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