import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/UserActions';
import LoadingBox from '../components/loadingbox';
import MessageBox from '../components/messagebox';
import Swal from 'sweetalert2';
import './form.css'


export default function ProfileScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    if(!user) {
      dispatch(detailsUser(userInfo._id));
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    if(password.length < 6) {
      Swal.fire({
        title: 'Error!',
        text: 'password must be at least 6 characters',
        icon: 'error',
        confirmButtonText: 'OK', 
        confirmButtonColor: '#cd9042',
      });
    } else if(firstName.length < 3 || firstName.length > 20 || lastName.length < 3 || lastName.length > 20){
      Swal.fire({
        title: 'Error!',
        text: 'name must be between 3 and 20 characters',
        icon: 'error',
        confirmButtonText: 'OK', 
        confirmButtonColor: '#cd9042',
      });
    } else if(password !== confirmPassword) {
      Swal.fire({
        title: 'Error!',
        text: 'password and confirm password are not match',
        icon: 'error',
        confirmButtonText: 'OK', 
        confirmButtonColor: '#cd9042',
      });
    } else {
      dispatch(updateUserProfile({ userId: user._id, firstName, lastName, email, password }));
      Swal.fire({
        title: 'successd',
        text: 'Your Informations Updated Successfully',
        icon: 'success',
        confirmButtonText: 'OK', 
        confirmButtonColor: '#cd9042',
      });
    }
  }

  return (
    <div className="row center">
      <Grid
        sx={{
          width: 500,
          maxWidth: '100%',
        }}
      >
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="error">{error}</MessageBox> }

        <Paper elevation={20} className="paper">
          <Typography variant="h4" className="form-head">update profile</Typography>
          <Box component="form" onSubmit={submitHandler} >
            <div className="form-body">
              <div className="name">
                <TextField 
                  name="firstName" 
                  type="text" 
                  id="firstName" 
                  variant="standard" 
                  defaultValue={userInfo.firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                />
                <TextField 
                  name="lastName" 
                  type="text" 
                  id="lastName" 
                  variant="standard" 
                  defaultValue={userInfo.lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                />
              </div>
              <TextField 
                fullWidth 
                name="email" 
                type="email" 
                id="email" 
                variant="standard" 
                defaultValue={userInfo.email} 
                onChange={(e) => setEmail(e.target.value)}  
              />
              <TextField 
                fullWidth 
                name="password" 
                type="password" 
                id="password" 
                label="Password" 
                variant="standard" 
                onChange={(e) => setPassword(e.target.value)}  
              />
              <TextField 
                fullWidth 
                name="confirmPassword" 
                type="password" 
                id="confirmPassword" 
                label="Confirm Password" 
                variant="standard" 
                onChange={(e) => setconfirmPassword(e.target.value)}  
              />
              <Button className="submit" type="submit" variant="contained">update</Button>
            </div>
          </Box>
        </Paper>
      </Grid>
    </div>
  )
}