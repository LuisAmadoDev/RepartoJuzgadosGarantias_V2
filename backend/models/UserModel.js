import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user" // 🔹 todos los nuevos usuarios son 'user' por defecto
  },
  active: { 
    type: Boolean, 
    default: true 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const UserModel = mongoose.model("User", userSchema);
