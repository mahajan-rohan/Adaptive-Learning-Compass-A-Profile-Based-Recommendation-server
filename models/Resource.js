import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  urls: [{ type: String, required: true }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Resource = mongoose.model("Resource", resourceSchema);
export default Resource;
