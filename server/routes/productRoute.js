const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/product/new")
  .post(isAuthenticated, authorizeRoles("admin"), createProduct);
router
  .route("/product/:id")
  .get(getProductDetails)
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);

module.exports = router;
