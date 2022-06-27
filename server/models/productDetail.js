import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: String,
  creator: String,
  price: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category'
},
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const productDetail = mongoose.model("products", productSchema);

export default productDetail;
