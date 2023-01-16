import Axios from 'axios';
// Add User
export const AddPatient = async (
  email,
  firstName,
  phoneNumber,
  lastName,
  age,
  gender,
  address,
  description,
  occupation,
  firstVisit,
  recurringvisit,
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
      address,
      description,
      occupation,
      firstVisit,
      recurringvisit,
      isPatient,
      createdBy,
    }
  );
  // if (response.data) {
  //   localStorage.setItem('user', JSON.stringify(response.data));
  // }
  // console.log('adduser', response.data);

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
  // if (response.data) {
  //   localStorage.setItem('user', JSON.stringify(response.data));
  // }
  // console.log('getuser', response.data);

  return response.data;
};
