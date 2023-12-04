const { boolean } = require('joi');
const mongoose = require('mongoose')

const Schema = mongoose.Schema ;


const MessageSchema = Schema({

  Sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  Content: {
    type: String,
  },
  Attachment: {
    type : [String]
  },
  Record: {
    type : String ,
  },
  ConversatoinId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  Viewers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }]



},
{ timestamps: true },)

module.exports = mongoose.model("Message" , MessageSchema)