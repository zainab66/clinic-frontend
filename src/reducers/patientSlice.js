import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AddPatient, getPatientList } from '../actions/patientAction';

const initialState = {
  patientsList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  isDeleted: false,
  isUpdate: false,
};

// Register user
export const addPtients = createAsyncThunk(
  'patient/addPatient',
  async (
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
    thunkAPI
  ) => {
    try {
      return await AddPatient(
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
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPatients = createAsyncThunk(
  'patient/getPatients',
  async (thunkAPI) => {
    try {
      return await getPatientList();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPtients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPtients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        //state.users = action.payload;
      })
      .addCase(addPtients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
        //state.users = null;
      })
      .addCase(getPatients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPatients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.patientsList = action.payload;
      })
      .addCase(getPatients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
        state.patientsList = null;
      });
  },
});

export const { reset } = patientSlice.actions;
export default patientSlice.reducer;
