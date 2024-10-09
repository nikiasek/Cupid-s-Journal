const mongoose = require('mongoose');
require("dotenv").config()

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("mongodb connected | Letters");
})
.catch(()=>{
  console.log('failed');
})

const LetterSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  htmlContent: {
    sections: [
      {
        header: { type: String },
        paragraphs: [{ type: String }],
        headings: [{ level: Number, text: String }],
        lists: [{ listType: String, items: [{ text: String }] }]
      }
    ]
  }
});

module.exports = mongoose.model("Letter", LetterSchema);