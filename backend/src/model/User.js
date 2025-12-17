import mongoose, { model } from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      typeof: String,
      required: true,
    },
    email: { typeof: String, required: true, unique: true },
    password: {
      typeof: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      defaul: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
