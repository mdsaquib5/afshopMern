import express from 'express';
import authUser from '../middlewares/authUser.js';
import authSeller from '../middlewares/authSeller.js';
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe, placeOrderRazorpay, verifyRazorpay } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD);
orderRouter.get('/user', authUser, getUserOrders);
orderRouter.get('/seller', authSeller, getAllOrders);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay-create-order', placeOrderRazorpay);
orderRouter.post('/razorpay-verify', verifyRazorpay);

export default orderRouter;