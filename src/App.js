import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './screens/Signup';
import Login from './screens/Signin';
import Dashboard from './screens/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import Main from './screens/Main';
import AddAssistant from './screens/AddAssistant';
import AssistanceDashboard from './screens/AssistanceDashboard';
import Home from './screens/Home';
import Appointments from './screens/Appointments';
import Patients from './screens/Patients';
import Assistants from './screens/Assistants';
import AddNewPatient from './screens/AddNewPatient';
import Calender from './screens/Calender';
import Tasks from './screens/Tasks';
import Editor from './screens/Editor';
import ColorPicker from './screens/ColorPicker';
import { ToastContainer } from 'react-toastify';
import ActivateUser from './screens/ActivateUser';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPatients, deleteUser, updateUser } from './reducers/patientSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

  return (
    <div>
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<PrivateRoute role="admin" />}>
            <Route path="" element={<Dashboard />}>
              <Route path="" element={<Main />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="assistants" element={<Assistants />} />
              <Route path="patients" element={<Patients />} />
              <Route path="add/assistant" element={<AddAssistant />} />
              <Route path="add/patient" element={<AddNewPatient />} />
              <Route path="add/patient" element={<AddNewPatient />} />
              <Route path="calender" element={<Calender />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="editor" element={<Editor />} />
              <Route path="colorPicker" element={<ColorPicker />} />
            </Route>
          </Route>
          <Route path="/activate/:token" element={<ActivateUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/assistance/dashboard"
            element={<PrivateRoute role="Assistant" />}
          >
            <Route
              path="/assistance/dashboard"
              element={<AssistanceDashboard />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
