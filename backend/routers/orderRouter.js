import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/order.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();
orderRouter.post('/', isAuth, expressAsyncHandler(async(req, res) => {
  if (req.body.orderItems.length === 0) {
    res.status(400).send({message: 'Your shopping cart is empty yet'})
  } else {
    const order = new Order({
      orderItems: req.body.orderItems,
      shippingInfo : req.body.shippingInfo,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    })
    const createdOrder = await order.save();
    res.status(201).send({message: 'New order created', order: createdOrder});
  }
}))

orderRouter.get('/:id', isAuth, expressAsyncHandler(async(req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(404).send({message: 'Order Not Found'});
  }
}))

export default orderRouter;