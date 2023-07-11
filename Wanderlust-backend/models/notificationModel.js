import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userType: { type: String, trim: true, require: true },
    title: { type: String, trim: true, require: true },
    description: { type: String, trim: true },
    refId: { type: String, trim: true, require: true },
    userId: { type: String, trim: true },
    readStatus: { type: Boolean, trim: true, require: true },
    createdAt: { type: String, trim: true, require: true },
    userEmail: { type: String, trim: true },
    userName: { type: String, trim: true },
    deleteStatus: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notifications", schema);
