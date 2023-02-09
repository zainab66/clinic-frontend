import Axios from 'axios';
const baseURL = 'http://localhost:3001/api';
//'https://xi-team-api.onrender.com/api';
// || 'http://localhost:3001/api';

export const getPatientByName = async (patientName) => {
  const response = await Axios.get(
    `${baseURL}/appointment/?search=${patientName}`,
    { patientName },
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

export const addAppointment = async (
  email,
  firstName,
  lastName,
  phoneNumber,
  age,
  gender,
  city,
  postalCode,
  region,
  isPatient,
  patientCreatedBy,
  patientId,
  createdBy,
  appointmentStatus,
  visitDate,
  visitTime
) => {
  const response = await Axios.post(
    `${baseURL}/appointment/addAppointment`,
    {
      email,
      firstName,
      lastName,
      phoneNumber,
      age,
      gender,
      city,
      postalCode,
      region,
      isPatient,
      patientCreatedBy,
      patientId,
      createdBy,
      appointmentStatus,
      visitDate,
      visitTime,
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

export const getAppointmentList = async () => {
  const response = await Axios.get(`${baseURL}/appointment/getAppointments`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });
  return response.data.appointments;
};

export const deleteAppointment = async (patientId) => {
  const response = await Axios.delete(
    `${baseURL}/appointment/${patientId}`,

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
