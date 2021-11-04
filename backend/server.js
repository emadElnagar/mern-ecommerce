import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';

const app = express();
const hostName = 'localhost';
const port = 5000;

mongoose.connect('mongodb://localhost/tienda', (err) => {
  if(err) {
    console.log(err)
  } else {
    console.log("successfully connected to database");
  }
});

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);

app.get('/', (req, res) => {
  res.send('server is ready')
});

app.listen(port, () => {
  console.log(`Server running at http://${hostName}:${port}/`);
});