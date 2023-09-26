const express = require('express')
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require("../middlewares/auth");
const { newOrder } = require('../controllers/orderController');

router.route('/order/new').post(isAuthenticated, newOrder)

module.exports = router;