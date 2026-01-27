import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  _id: { type: String, require: true },
  username: {type:String, require: true},
  email: {type:String, require: true},
  image: {type:String, require: true},
  role: {type:String, enum: ["user", "agencyOwner"], default: "user"},
  recentSearchedCities: [{type:String}],
}, {timestamps: true});

const User = mongoose.model("User", userSchema)

export default User
