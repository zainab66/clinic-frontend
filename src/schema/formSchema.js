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
