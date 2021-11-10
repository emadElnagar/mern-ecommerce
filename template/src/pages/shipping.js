import React, { useState } from "react";
import CheckoutSteps from "../components/checkoutSteps";
import { Button, Grid, Paper, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import './form.css';
import { saveShippingInfo } from "../actions/CartActions";

export default function Shipping(props) {
  const userSignIn = useSelector(state => state.userSignIn);
  const { userInfo } = userSignIn;
  if(!userInfo) {
    props.history.push('/signin');
  }
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({firstName, lastName, phoneNumber, address, country, city, postalCode}));
    props.history.push('/placeorder');
  }
  
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="row center">
        <Grid
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <Paper elevation={20} className="paper">
            <Typography variant="h4" className="form-head">sign in</Typography>
            <Box component="form" onSubmit={submitHandler} >
              <div className="form-body">
                <TextField 
                  fullWidth 
                  name="firstName" 
                  id="firstName"
                  type="text" 
                  label="First Name" 
                  variant="standard" 
                  onChange={(e) => setFirstName(e.target.value)} 
                  required 
                />
                <TextField 
                  fullWidth 
                  name="lastName" 
                  id="lastName"
                  type="text" 
                  label="Last Name" 
                  variant="standard" 
                  onChange={(e) => setLastName(e.target.value)} 
                  required 
                />
                <TextField 
                  fullWidth 
                  name="phoneNumber" 
                  id="phoneNumber"
                  type="text" 
                  label="Phone Number" 
                  variant="standard" 
                  onChange={(e) => setPhoneNumber(e.target.value)} 
                  required 
                />
                <TextField 
                  fullWidth 
                  name="address" 
                  id="address"
                  type="text" 
                  label="Address" 
                  variant="standard" 
                  onChange={(e) => setAddress(e.target.value)} 
                  required 
                />
                <TextField 
                  fullWidth 
                  name="country" 
                  id="country"
                  type="text" 
                  label="Country" 
                  variant="standard" 
                  onChange={(e) => setCountry(e.target.value)} 
                  required 
                />
                <TextField 
                  fullWidth 
                  name="city" 
                  id="city"
                  type="text" 
                  label="City" 
                  variant="standard" 
                  onChange={(e) => setCity(e.target.value)} 
                  required 
                />
                <TextField 
                  fullWidth 
                  name="postalCode" 
                  id="postalCode"
                  type="text" 
                  label="PostalCode" 
                  variant="standard" 
                  onChange={(e) => setPostalCode(e.target.value)} 
                  required 
                />
                <Button className="submit" type="submit" variant="contained">submit</Button>
              </div>
            </Box>
          </Paper>
        </Grid>
      </div>
    </div>
  )
}