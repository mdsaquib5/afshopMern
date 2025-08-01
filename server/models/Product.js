// import mongoose from 'mongoose';

// const productSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: Array, required: true },
//     price: { type: Number, required: true },
//     offerPrice: { type: Number, required: true },
//     image: { type: Array, required: true },
//     category: { type: String, required: true },
//     inStock: { type: Boolean, default: true },
// }, {timestamps: true } );

// productSchema.virtual('discountAmount').get(function () {
//     return Math.max(0, this.price - this.offerPrice);
// });

// const Product = mongoose.models.product || mongoose.model('product', productSchema);

// export default Product;



import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: Array, required: true },
  price: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  inStock: { type: Boolean, default: true },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

productSchema.virtual('discountAmount').get(function () {
  return Math.max(0, this.price - this.offerPrice);
});

productSchema.virtual('discountPercent').get(function () {
  if (this.price === 0) return 0;
  const percent = ((this.price - this.offerPrice) / this.price) * 100;
  return Math.round(percent); // Round to nearest integer
});

const Product = mongoose.models.product || mongoose.model('product', productSchema);
export default Product;
