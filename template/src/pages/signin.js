import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid, Paper, Typography } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { signin } from '../actions/UserActions';
import './form.css';

export default function Signin(props) {
  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = props.location.search 
  ? props.location.search.split('=')[1] 
  : '/';

  const userSignIn = useSelector(state => state.userSignIn);
	const { userInfo, loading, error } = userSignIn;
  
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
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
        {loading && <loadingBox></loadingBox>}
        {error && <messageBox variant="error">{error}</messageBox> }
        <Paper elevation={20} className="paper">
          <Typography variant="h4" className="form-head">sign in</Typography>
          <Box component="form" onSubmit={submitHandler} >
            <div className="form-body">
              <TextField 
                fullWidth 
                name="email" 
                id="email"
                type="email" 
                label="Email" 
                variant="standard" 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              <FormControl 
                fullWidth 
                name="password" 
                id="password" 
                label="Password" 
                variant="standard" 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              >
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment= {
                    <InputAdornment position="end">
                    <IconButton
                      className="pass-icon"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} className="remember-me" label="Remember Me" />
              </FormGroup>
              <Button className="submit" type="submit" variant="contained">sign in</Button>
              <div>
                Don't have an account? <Link to={`/signup?redirect=${redirect}`}>SignUp</Link>
              </div>
            </div>
          </Box>
        </Paper>
      </Grid>
    </div>
  )
}