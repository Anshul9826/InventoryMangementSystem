import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  name: { type: String, unique: true },
  creator: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const categoryDetail = mongoose.model("category", categorySchema);

export default categoryDetail;
