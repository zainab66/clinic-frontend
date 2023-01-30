import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import assistantReducer from './reducers/assistantSlice';
import patientReducer from './reducers/patientSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    assistant: assistantReducer,
    patient: patientReducer,
  },
});

export default store;
