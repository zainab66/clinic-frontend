import Axios from 'axios';
const baseURL =
  //'http://localhost:3001/api';
  'https://xi-team-api.onrender.com/api';
// || 'http://localhost:3001/api';

// Add Patient
export const AddPatient = async (
  email,
  firstName,
  phoneNumber,
  lastName,
  age,
  gender,
  city,
  region,
  postalCode,
  isPatient,
  createdBy
) => {
  const response = await Axios.post(
    `${baseURL}/patient/addPatient`,
    {
      email,
      firstName,
      phoneNumber,
      lastName,
      age,
      gender,
      city,
      region,
      postalCode,
      isPatient,
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
  return response.data;
};

export const getPatientList = async () => {
  const response = await Axios.get(`${baseURL}/patient/getPatient`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });
  return response.data.patients;
};

export const editPatient = async (patient) => {
  const response = await Axios.put(
    `${baseURL}/patient/${patient.patientId}`,
    patient,
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

export const deletePatient = async (patientId) => {
  const response = await Axios.delete(
    `${baseURL}/patient/${patientId}`,

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
