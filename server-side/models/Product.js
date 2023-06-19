const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide product name"],
  },
  brand: {
    type: String,
    required: [true, "Please provide product brand"],
  },
  price: {
    type: Number,
    required: [true, "Please provide product price"],
  },
  category: {
    type: String,
    required: [true, "Please provide product category"],
  },
  specifications: {
    type: Array,
    required: [true, "Please provide product specifications"],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  imgUrl: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Product", ProductSchema);
