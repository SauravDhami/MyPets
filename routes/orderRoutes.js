const express = require('express');

const router = express.Router({ mergeParams: true });

const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');

router.use(authController.protect);
router.route('/').get(orderController.getAllUserOrders).post(orderController.createOrder);

router
    .route(`/:id`)
    .get(orderController.getUserOrder)
    .patch(orderController.updateUserOrder)
    .delete(orderController.deleteUserOrder);

router.use(authController.allowedTo('admin'));

router.route('/').get(orderController.getAllOrders);

router
    .route(`/:id`)
    .get(orderController.getUserOrder)
    .post(orderController.createOrder)
    .patch(orderController.updateOrder)
    .delete(orderController.deleteOrder);

module.exports = router;
