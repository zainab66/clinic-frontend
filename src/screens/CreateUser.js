import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import LineChart from '../components/LineChart';
import { UserData } from '../components/Data';
import PieChart from '../components/PieChart';
import Orders from '../components/Orders';
import Toolbar from '@mui/material/Toolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UserList from './UserList';
import Title from '../components/Title';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addUsers, reset } from '../reducers/assistantSlice';

const mdTheme = createTheme();

export default function CreateUser() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');

  const [isCustomer, setIsCustomer] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const createdBy = user._id;

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(
      email,
      fullName,
      phoneNumber,
      country,
      state,
      city,
      address,
      zipCode,
      company,
      role,
      isCustomer,
      password,
      createdBy
    );

    dispatch(
      addUsers({
        email,
        fullName,
        phoneNumber,
        country,
        state,
        city,
        address,
        zipCode,
        company,
        role,
        isCustomer,
        password,
        createdBy,
      })
    );
  };

  return (
    <div>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <Box
            component="main"
            sx={{
              // backgroundColor: (theme) =>
              //   theme.palette.mode === 'light'
              //     ? theme.palette.grey[100]
              //     : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Title>Create a new user</Title>

              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={6} md={8} lg={8}>
                  Dashboard/User/New user
                </Grid>
              </Grid>
            </Container>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={6} md={8} lg={4}>
                  <Paper
                    sx={{
                      p: 2,
                    }}
                    elevation={4}
                  >
                    hhhhh
                  </Paper>
                </Grid>
                {/* PieChart */}
                <Grid item xs={3} md={4} lg={8}>
                  <Paper
                    sx={{
                      p: 2,
                    }}
                    elevation={4}
                  >
                    <Box
                      component="form"
                      onSubmit={handleSubmit}
                      noValidate
                      sx={{ mt: 1 }}
                    >
                      <Grid container spacing={2} columns={16}>
                        <Grid item xs={8}>
                          <TextField
                            autoComplete="given-name"
                            name="FullName"
                            fullWidth
                            id="FullName"
                            label="FullName"
                            autoFocus
                            variant="outlined"
                            onChange={(e) => setFullName(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <TextField
                            autoComplete="Email-Address"
                            name="EmailAddress"
                            fullWidth
                            id="EmailAddress"
                            label="Email Address"
                            autoFocus
                            variant="outlined"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <TextField
                            autoComplete="Password"
                            name="Password"
                            fullWidth
                            id="Password"
                            label="Password"
                            autoFocus
                            variant="outlined"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <TextField
                            autoComplete="Phone-Number"
                            name="PhoneNumber"
                            fullWidth
                            id="PhoneNumber"
                            label="Phone Number"
                            autoFocus
                            variant="outlined"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <TextField
                            autoComplete="Country"
                            name="Country"
                            fullWidth
                            id="Country"
                            label="Country"
                            autoFocus
                            variant="outlined"
                            onChange={(e) => setCountry(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <TextField
                            autoComplete="State/Region"
                            name="State/Region"
                            fullWidth
                            id="State/Region"
                            label="State/Region"
                            autoFocus
                            variant="outlined"
                            onChange={(e) => setState(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <TextField
                            autoComplete="City"
                            name="City"
                            fullWidth
                            id="City"
                            label="City"
                            autoFocus
                            variant="outlined"
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <TextField
                            autoComplete="Address"
                            name="Address"
                            fullWidth
                            id="Address"
                            label="Address"
                            autoFocus
                            variant="outlined"
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <TextField
                            autoComplete="Zip/code"
                            name="Zip/code"
                            fullWidth
                            id="Zip/code"
                            label="Zip/code"
                            autoFocus
                            variant="outlined"
                            onChange={(e) => setZipCode(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <TextField
                            autoComplete="Company"
                            name="Company"
                            fullWidth
                            id="Company"
                            label="Company"
                            autoFocus
                            variant="outlined"
                            onChange={(e) => setCompany(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <TextField
                            autoComplete="Role"
                            name="Role"
                            fullWidth
                            id="Role"
                            label="Role"
                            autoFocus
                            variant="outlined"
                            onChange={(e) => setRole(e.target.value)}
                          />
                        </Grid>

                        <Grid
                          container
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Grid item></Grid>
                          <Grid
                            item
                            sx={{
                              paddingTop: 2,
                            }}
                          >
                            <Button type="submit" variant="outlined">
                              Create User
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}
