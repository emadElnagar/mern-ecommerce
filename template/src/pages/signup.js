import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid, Paper, Typography } from '@mui/material';
import './form.css';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../actions/UserActions';
import MessageBox from '../components/messagebox';
import LoadingBox from '../components/loadingbox';
import Swal from 'sweetalert2';

export default function Signup(props) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  const redirect = props.location.search 
  ? props.location.search.split('=')[1] 
  : '/';

  const userSignUp = useSelector(state => state.userSignUp);
	const { userInfo, loading, error } = userSignUp;
  
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if(password.length < 6) {
      Swal.fire({
        title: 'Error!',
        text: 'password must be at least 6 characters',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } else if(firstName.length < 3 || firstName.length > 20 || lastName.length < 3 || lastName.length > 20){
      Swal.fire({
        title: 'Error!',
        text: 'name must be between 3 and 20 characters',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } else if(password !== confirmPassword) {
      Swal.fire({
        title: 'Error!',
        text: 'password and confirm password are not match',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } else {
      dispatch(signup(firstName, lastName, email, password, confirmPassword));
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

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
          <Typography variant="h4" className="form-head">sign up</Typography>
          <Box component="form" onSubmit={submitHandler} >
            <div className="form-body">
              <div className="name">
                <TextField 
                  name="firstName" 
                  type="text" 
                  id="firstName" 
                  label="First Name" 
                  variant="standard" 
                  onChange={(e) => setFirstName(e.target.value)} 
                  required 
                />
                <TextField 
                  name="lastName" 
                  type="text" 
                  id="lastName" 
                  label="Last Name" 
                  variant="standard" 
                  onChange={(e) => setLastName(e.target.value)} 
                  required 
                />
              </div>
              <TextField 
                fullWidth 
                name="email" 
                type="email" 
                id="email" 
                label="Email" 
                variant="standard" 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              <TextField 
                fullWidth 
                name="password" 
                type="password" 
                id="password" 
                label="Password" 
                variant="standard" 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <TextField 
                fullWidth 
                name="confirmPassword" 
                type="password" 
                id="confirmPassword" 
                label="Confirm Password" 
                variant="standard" 
                onChange={(e) => setconfirmPassword(e.target.value)} 
                required 
              />
              <Button className="submit" type="submit" variant="contained">sign up</Button>
              <div>
                Have an account? <Link to={`/signin?redirect=${redirect}`}>SignIn</Link>
              </div>
            </div>
          </Box>
        </Paper>
      </Grid>
    </div>
  )
}