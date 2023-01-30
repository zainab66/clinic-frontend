import Axios from 'axios';
import { toast } from 'react-toastify';

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
    'http://localhost:3001/api/patient/addPatient',
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
    }
  );
  if (response.data.message === 'Patient create successfully') {
    toast.success('Patient create successfully');
  } else {
    toast.error(response.data.message);
  }
  return response.data;
};

export const getPatientList = async () => {
  const response = await Axios.get(
    'http://localhost:3001/api/patient/getPatient',
    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    }
  );
  return response.data.patients;
};

export const editPatient = async (patient) => {
  const response = await Axios.put(
    `http://localhost:3001/api/patient/${patient.patientId}`,
    patient,
    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    }
  );
  if (response.data.message) {
    toast.success(response.data.message);
  }
  return response.data;
};

export const deletePatient = async (patientId) => {
  const response = await Axios.delete(
    `http://localhost:3001/api/patient/${patientId}`,

    {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('user')).token
        }`,
      },
    }
  );
  if (response.data.message) {
    toast.success(response.data.message);
  }
  return response.data;
};
