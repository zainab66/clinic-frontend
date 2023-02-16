import Axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = 'https://xi-team-api.onrender.com/api';
// || 'http://localhost:3001/api';

// Register User
export const doctorRegister = async (name, email, password, role) => {
  const response = await Axios.post(`${baseURL}/doctor/register`, {
    name,
    email,
    password,
    role,
  });

  return response.data;
};

// Logout user
export const userLogout = () => {
  localStorage.removeItem('user');
};

// Login User
export const signin = async (email, password) => {
  const response = await Axios.post(`${baseURL}/doctor/signin`, {
    email,
    password,
  });
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  if (response.data.message === 'Login successfully') {
    toast.success(response.data.message);
  } else {
    toast.error(response.data.message);
  }
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await Axios.put(`${baseURL}/doctor/forget-password`, {
    email,
  });
  return response.data;
};

export const resetPasswordUser = async (token, password) => {
  const response = await Axios.put(`${baseURL}/doctor/reset-password`, {
    token,
    password,
  });
  return response.data;
};

export const editUser = async (formData) => {
  const response = await Axios.put(`${baseURL}/doctor/editUser`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getUser = async (id) => {
  const response = await Axios.get(`${baseURL}/doctor/getUser/${id}`);
  return response.data;
};
