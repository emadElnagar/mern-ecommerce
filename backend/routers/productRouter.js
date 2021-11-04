import express from 'express';
import data from '../data.js'
import Product from '../models/product.js';

const productRouter = express.Router();

productRouter.get('/', async(req, res) => {
  const products = await Product.find({});
  res.send(products);
});

productRouter.get('/productcreated', async(req, res) => {
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdProducts });
});

productRouter.get('/:id', async(req, res) => {
  const product = await Product.findById(req.params.id);
  if(product) {
    res.send(product);
  } else {
    res.status(404).send({message: 'product not found'});
  }
});

export default productRouter;