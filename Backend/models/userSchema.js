const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    Email: {
      type: String,
    },
    Password: {
      type: String,
    },
    Verified: {
      type: Boolean,
      default: false,
    },
    PhoneNumber: {
      type: String,
    },
    Name: {
      type: String,
      default: "",
    },
    Role: {
      type: String,
      default: "User",
    },
    Image: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/1738/1738691.png",
    },
    About: {
      type: String,
      default: "",
    },
    Country: {
      type: String,
      default: "",
    },
    City: {
      type: String,
      default: "",
    },
    Conversations: {
      type: [Schema.Types.ObjectId],
      ref: "Conversation",
      default: [],
    },
    Notification: {
      type : Number ,
      default: 0 ,
    },
    Friends: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
