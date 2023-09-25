const express = require('express')
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController')
const { isAuthenticated } = require('../middlewares/auth')

const router = express.Router()

router.route('/products').get(isAuthenticated,getAllProducts)
router.route('/product/new').post(createProduct)
router.route('/product/:id').get(getProductDetails).put(updateProduct).delete(deleteProduct)

module.exports = router;