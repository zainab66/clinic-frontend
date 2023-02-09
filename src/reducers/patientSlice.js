import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  AddPatient,
  getPatientList,
  editPatient,
  deletePatient,
} from '../actions/patientAction';

const initialState = {
  patientsList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  isDeleted: false,
  isUpdate: false,
};

// Add patient
export const addPtients = createAsyncThunk(
  'patient/addPatients',
  async (
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
    },
    { rejectWithValue }
  ) => {
    try {
      return await AddPatient(
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
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editPatients = createAsyncThunk(
  'patient/editPatients',
  async (
    {
      patientId,
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
    },
    { rejectWithValue }
  ) => {
    try {
      return await editPatient({
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
        patientId,
      });
    } catch (error) {
      return rejectWithValue(error.response.data);
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

export const delPatient = createAsyncThunk(
  'patient/delPatient',
  async (patientId, { rejectWithValue }) => {
    try {
      return await deletePatient(patientId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    resetReducerPatients: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.messageEditPatients = '';
      state.isErrorEditPatients = false;
      state.isSuccessEditPatients = false;
      state.messageAddPtients = '';
      state.isErrorAddPtients = false;
      state.isSuccessAddPtients = false;
      state.messageDelPatient = '';
      state.isSuccessDelPatient = false;
      state.isErrorDelPatient = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPtients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPtients.fulfilled, (state, action) => {
        state.isLoadingAddPtients = false;
        state.isSuccessAddPtients = true;
        state.messageAddPtients = action.payload.message;
      })
      .addCase(addPtients.rejected, (state, action) => {
        state.isLoadingAddPtients = false;
        state.isErrorAddPtients = true;
        state.messageAddPtients = action.payload.message;
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
        state.message = action.payload.message;
        state.patientsList = null;
      })

      .addCase(editPatients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editPatients.fulfilled, (state, action) => {
        state.isLoadingEditPatients = false;
        state.isSuccessEditPatients = true;
        state.messageEditPatients = action.payload.message;
      })
      .addCase(editPatients.rejected, (state, action) => {
        state.isLoading = false;
        state.isErrorEditPatients = true;
        state.messageEditPatients = action.payload.message;
      })
      .addCase(delPatient.pending, (state) => {
        state.isLoadingDelPatient = true;
      })
      .addCase(delPatient.fulfilled, (state, action) => {
        state.isLoadingDelPatient = false;
        state.isSuccessDelPatient = true;
        state.messageDelPatient = action.payload.message;
      })
      .addCase(delPatient.rejected, (state, action) => {
        state.isLoadingDelPatient = false;
        state.isErrorDelPatient = true;
        state.messageDelPatient = action.payload.message;
      });
  },
});

export const { resetReducerPatients } = patientSlice.actions;
export default patientSlice.reducer;
