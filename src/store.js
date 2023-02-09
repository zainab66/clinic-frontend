import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import assistantReducer from './reducers/assistantSlice';
import patientReducer from './reducers/patientSlice';
import appointmentReducer from './reducers/appointmentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    assistant: assistantReducer,
    patient: patientReducer,
    appointment: appointmentReducer,
  },
});

export default store;
