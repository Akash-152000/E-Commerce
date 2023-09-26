const express = require('express')
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");
const { newOrder, getSingleOrder, myOrders } = require('../controllers/orderController');

router.route('/order/new').post(isAuthenticated, newOrder)
router.route('/order/:id').get(isAuthenticated, getSingleOrder)
router.route('/orders/me').get(isAuthenticated, myOrders)

module.exports = router;