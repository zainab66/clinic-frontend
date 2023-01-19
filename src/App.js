import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './screens/Signup';
import Login from './screens/Signin';
import Dashboard from './screens/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import Main from './screens/Main';
import AddAssistant from './screens/AddAssistant';
import Denied from './screens/Denied';
import Home from './screens/Home';
import Appointments from './screens/Appointments';
import Patients from './screens/Patients';
import Assistants from './screens/Assistants';
import AddNewPatient from './screens/AddNewPatient';
import Calender from './screens/Calender';
import Tasks from './screens/Tasks';
import Editor from './screens/Editor';
import ColorPicker from './screens/ColorPicker';

function App() {
  return (
    <div>
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/denied" element={<PrivateRoute role="Assistant" />}>
            <Route path="/denied" element={<Denied />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
