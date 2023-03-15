import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import assistantReducer from './reducers/assistantSlice';
import patientReducer from './reducers/patientSlice';
import appointmentReducer from './reducers/appointmentSlice';
import eventReducer from './reducers/eventSlice';
import taskReducer from './reducers/taskSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    assistant: assistantReducer,
    patient: patientReducer,
    appointment: appointmentReducer,
    event: eventReducer,
    task: taskReducer,
  },
});

export default store;
