const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const commentSchema = new mongoose.Schema({
  text: {
   type: String,
   trim: true,
   required: true
  },
  commentBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
   type: Date,
   default: Date.now
   }
  });

module.exports = mongoose.model('Comment',commentSchema);

