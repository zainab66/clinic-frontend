import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../reducers/authSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';

// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
// import AddPatient from './AddPatient';
// import PatientsList from './PatientsList';
// import DashboardSearch from './DashboardSearch';
// import { Button } from 'react-bootstrap';
// import logo from '../logo.svg';

export default function Denied() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <>
      <h>denied</h>
      {/* <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            React Bootstrap
          </Navbar.Brand>
          <Button onClick={handleLogout}>Logout</Button>
        </Container>
      </Navbar>

      <Container className="mt-2">
        <Tabs defaultActiveKey="home" className="mb-3">
          <Tab eventKey="home" title="Book new patient">
            <AddPatient />
          </Tab>
          <Tab eventKey="profile" title="List of all patient">
            <PatientsList />
          </Tab>
          <Tab eventKey="contact" title="Dashboard search">
            <DashboardSearch />
          </Tab>
        </Tabs>
      </Container> */}
    </>
  );
}
