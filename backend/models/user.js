const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = process.env.MONGO_URI || 'mongodb://localhost:27017/cupids_journal_db';

mongoose.connect(connectDB)
.then(()=>{
  console.log("mongodb connected");
})
.catch(()=>{
  console.log('failed');
})

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});



UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('User', UserSchema);
