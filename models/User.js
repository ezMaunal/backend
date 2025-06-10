import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  kakaoId: {
    type: String,
    required: true,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: null,
  },
  refreshToken: {
    type: String,
    default: null,
  },
  highlightColor: {
    type: String,
    default: "#ff0000",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
