const Conversation = require("../models/conversationsSchema")
const Message = require("../models/messagesSchema")
const User = require("../models/userSchema")
const asyncHandler = require("express-async-handler");
const uploadImage = require("../utils/uploadImage");


const addFriend = asyncHandler(async (req,res) => {
  // const {}
  const friendPhone = req.body.phone ;
  const friendData = await User.findOne({PhoneNumber : friendPhone})
  if(friendData._id)
  {
    await User.findByIdAndUpdate(req.userId , {$push : {Friends: friendData._id}})

    return res.status(200).json({
      message : "User added successfully !"
    })
  }else
  {
    return res.status(404).json({
      message : "User not found !"
    })
  }
  
}
)

const displayFriends = asyncHandler( async (req,res) => {

  const data = await User.findById(req.userId,
    "Friends").populate({path : "Friends" , select : "Name PhoneNumber"})

  return res.status(200).json({
    data : data
  })
  
}
)

const displayConversation = asyncHandler(async (req,res) => {

  const data = await User.findById(req.userId , "Conversations").populate({path : "Conversation" , populate : {
    path : "LastMessage",
    select : "Sender Content Attachment Record"
  }})

  return res.status(200).json({
    data : data
  })
  
}
)


const createGroup = asyncHandler(async (req,res)=> {
  // const {name , }
}
)


module.exports = {
  addFriend,
  displayFriends,
  displayConversation,

}