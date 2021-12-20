import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import data from '../data.js';
import User from '../models/user.js';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.get('/userCreated', expressAsyncHandler(async(req, res) => {
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers });
}));

userRouter.post('/signin', expressAsyncHandler(async(req, res) => {
  const user = await User.findOne({email: req.body.email});
  if(user){
    if(bcrypt.compareSync(req.body.password, user.password)){
      res.send({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }
  }
  res.status(401).send({message: 'invalid email or password'})
}));

userRouter.post('/signup', expressAsyncHandler(async(req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  const createdUser = await user.save();
  res.send({
    _id: createdUser._id,
    firstName: createdUser.firstName,
    lastName: createdUser.lastName,
    email: createdUser.email,
    isAdmin: createdUser.isAdmin,
    token: generateToken(createdUser),
  });
}));

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);


export default userRouter;