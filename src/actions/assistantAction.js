import Axios from 'axios';
import { toast } from 'react-toastify';

// Add User
export const addUser = async (email, fullName, role, createdBy) => {
  const response = await Axios.post(
    'http://localhost:3001/api/assistant/addUser',
    {
      email,
      fullName,
      role,
      createdBy,
    }
  );
  if (response.data.message === 'Invitation send successfully') {
    toast.success('Invitation send successfully');
  } else {
    toast.error(response.data.message);
  }
  return response.data;
};

export const getUsersList = async () => {
  const response = await Axios.get(
    'http://localhost:3001/api/assistant/getUsers',
    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    }
  );
  return response.data;
};

export const activateUser = async (token) => {
  const response = await Axios.post(
    'http://localhost:3001/api/assistant/email-activate',
    { token }
  );

  return response.data;
};

export const deleteUserInfo = async (userId) => {
  const response = await Axios.delete(
    `https://xi-team-api.onrender.com/api/assistant/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    }
  );
  return response.data;
};

export const editUser = async (user) => {
  const response = await Axios.put(
    `https://xi-team-api.onrender.com/api/assistant/${user._id}`,
    user,
    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    }
  );
  return response.data;
};
