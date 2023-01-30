import Axios from 'axios';

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Register User
export const doctorRegister = async (name, email, password, role) => {
  const response = await Axios.post(
    'https://xi-team-api.onrender.com/api/doctor/register',
    {
      name,
      email,
      password,
      role,
    }
  );
  // if (response.data) {
  //   localStorage.setItem('user', JSON.stringify(response.data));
  // }

  console.log('re', response.data);
};

// Logout user
export const userLogout = () => {
  localStorage.removeItem('user');
};

// Login User
export const signin = async (email, password) => {
  const response = await Axios.post('http://localhost:3001/api/doctor/signin', {
    email,
    password,
  });
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};
