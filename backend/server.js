import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const hostName = 'localhost';
const port = 5000;

mongoose.connect('mongodb://localhost/tiendaecommerce', (err) => {
  if(err) {
    console.log(err);
  } else {
    console.log("successfully connected to database");
  }
});

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/payment/paypal', (req, res) =>{
  res.send(process.env.PAYPAL_ID || 'sb');
})

app.use(express.static('template/build'))
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/template/build/index.html`)
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.listen(port, () => {
  console.log(`Server running at http://${hostName}:${port}/`);
});