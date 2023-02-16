import Axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = 'http://localhost:3001/api';
//'https://xi-team-api.onrender.com/api';
// || 'http://localhost:3001/api';

// Add User
export const addUser = async (email, fullName, role, createdBy) => {
  const response = await Axios.post(
    `${baseURL}/assistant/addUser`,
    {
      email,
      fullName,
      role,
      createdBy,
    },
    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    }
  );
  if (response.data.message === 'Invitation send successfully') {
    toast.success('Invitation send successfully');
  } else {
    toast.error(response.data.message);
  }
  return response.data;
};

export const getAssistantList = async () => {
  const response = await Axios.get(`${baseURL}/assistant/getUsers`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });
  return response.data.users;
};

export const activateUser = async (token) => {
  const response = await Axios.post(`${baseURL}/assistant/email-activate`, {
    token,
  });

  return response.data;
};

export const deleteUserInfo = async (userId) => {
  const response = await Axios.delete(`${baseURL}/assistant/${userId}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });
  return response.data;
};

export const editUser = async (assistant) => {
  const response = await Axios.put(
    `${baseURL}/assistant/${assistant.assisstantId}`,
    assistant,
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
