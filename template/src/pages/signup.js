import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid, Paper, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './form.css';

export default function Signup() {

  return (
    <div className="row center">
      <Grid
        sx={{
          width: 500,
          maxWidth: '100%',
        }}
      >
        <Paper elevation={20} className="paper">
          <Typography variant="h4" className="form-head">sign up</Typography>
          <Box component="form" >
            <div className="form-body">
              <div className="name">
                <TextField 
                  name="firstName" 
                  id="standard-basic" 
                  label="First Name" 
                  variant="standard" 
                  required 
                />
                <TextField 
                  name="lastName" 
                  id="standard-basic" 
                  label="Last Name" 
                  variant="standard" 
                  required 
                />
              </div>
              <TextField 
                fullWidth 
                name="email" 
                id="standard-basic" 
                label="Email" 
                variant="standard" 
                required 
              />
              <TextField 
                fullWidth 
                name="password" 
                id="standard-basic" 
                label="Password" 
                variant="standard" 
                required 
              />
              <TextField 
                fullWidth 
                name="password" 
                id="standard-basic" 
                label="Confirm Password" 
                variant="standard" 
                required 
              />
              <TextField 
                fullWidth 
                name="phone" 
                id="standard-basic" 
                label="Phone Number" 
                variant="standard" 
              />
              <div className="gender">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    defaultValue=""
                    name="radio-buttons-group"
                    style={{display:'initial'}}
                  >
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                  </RadioGroup>
                </FormControl>
              </div>
              <Button className="submit" type="submit" variant="contained">sign up</Button>
              <div>
                Have an account? <Link to="/signin">SignIn</Link>
              </div>
            </div>
          </Box>
        </Paper>
      </Grid>
    </div>
  )
}