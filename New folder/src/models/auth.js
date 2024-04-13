import mongoose from "mongoose";

const authSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
    versionKey: false,
  }
);
export default mongoose.model("Auth", authSchema);
