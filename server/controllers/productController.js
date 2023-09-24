const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create a Product - ADMIN

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get all Products

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
  });
});

// Update product --Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("Product Not Found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product -- Admin

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("Product Not Found", 404));
  }

  await product.deleteOne({ _id: req.params.id }); // remove() is deprecated

  res.status(200).json({
    success: true,
    message: `${product.name} has been deleted`,
  });
});

// Get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.id });

  if (!product) {
    return next(new Errorhandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});
