const { boolean } = require('joi');
const mongoose = require('mongoose')

const Schema = mongoose.Schema ;


const ConversationsSchema = Schema({

  Participants: {
    type: Map,
    of: new Schema({
      Name: { type: String },
      Notification: { type: Number, default: 0 },
    }),
    default: new Map(),
  },
  IsGroup: {
    type : Boolean ,
    default : false ,
  },
  GroupName : {
    type : String , 
  },
  LastMessage : {
    type: Schema.Types.ObjectId,
    ref: "Message",
    default: "",
  }


},
{ timestamps: true },)

module.exports = mongoose.model("Conversation" , ConversationsSchema)