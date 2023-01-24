import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import assistantReducer from './reducers/assistantSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    assistant: assistantReducer,
  },
});

export default store;
