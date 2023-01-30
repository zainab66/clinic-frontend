import * as yup from 'yup';

export const inviteSchema = yup.object().shape({
  email: yup
    .string('email should be a string')
    .email('please provide a valid email address')
    .required('email address is required'),
  fullName: yup
    .string('FullName should be a string')
    .min(3, 'FullName should have a minimum length of 5')
    // .max(12, 'FullName should have a maximum length of 12')
    .required('FullName is required'),
});

export const patientSchema = yup.object().shape({
  email: yup
    .string('email should be a string')
    .email('please provide a valid email address')
    .required('email address is required'),
  firstName: yup
    .string('Full Name should be a string')
    .min(3, 'Full Name should have a minimum length of 3')
    // .max(12, 'FullName should have a maximum length of 12')
    .required('Full Name is required'),
  lastName: yup
    .string('Last Name should be a string')
    .min(3, 'Last Name should have a minimum length of 3')
    .required('Last Name is required'),
  phoneNumber: yup
    .string()
    .required('A phone number is required')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'A phone number should have 10 digits')
    .max(10, 'A phone number should have 10 digits'),
  age: yup
    .string('Age should be a string')
    .matches(/^[1-9]+$/, 'Age should have a minimum length of 1')
    .min(1, 'Age should have a minimum length of 1')
    .required('Age is required'),
  gender: yup
    .string('Gender should be a string')
    .required('Gender is required'),
  city: yup.string('City should be a string').required('City is required'),
  region: yup
    .string('Region should be a string')
    .required('Region is required'),
  postalCode: yup
    .string('Postal Code should be a string')
    .required('Postal Code is required'),
});
