import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    room: {
      type: String,
      required: true,
      maxlength: 50,
    },
    author: {
      type: String,
      required: true,
      maxlength: 50,
    },
    message: {
      type: String,
      required: true,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

messageSchema.index({ list: 1, name: 1 }, { unique: true });

export const Message = mongoose.model("message", messageSchema);
