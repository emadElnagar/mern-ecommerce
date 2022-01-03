import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  rating: { type: Number, required: true },
  reviesNum: { type: Number, required: true },
  description: { type: String, required: true },
  timeAdded : { type : Date, default: Date.now }
}, {
  timestamps: true,
});

const Product = mongoose.model("Product", productSchema);
export default Product;
