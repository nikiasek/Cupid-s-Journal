const mongoose = require('mongoose');
require("dotenv").config()

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("mongodb connected | contentChunks");
})
.catch(()=>{
  console.log('failed');
})

const contentChunkSchema = new mongoose.Schema({
    id: String,
    html: String,
    type: String, // e.g. "header", "paragraph", "image", etc.
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }
  });
  
  const ContentChunk = mongoose.model('ContentChunk', contentChunkSchema);