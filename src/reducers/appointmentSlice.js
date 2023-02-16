import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteAppointment,
  getPatientByName,
  addAppointment,
  getAppointmentList,
  editAppointment,
} from '../actions/appointmentAction';

const initialState = {
  patientsListByName: [],
  appointmentList: [],
  isErrorPatientsListByName: false,
  isSuccessPatientsListByName: false,
  isLoadingPatientsListByName: false,
  messagePatientsListByName: '',
  isErrorAddNewAppointment: false,
  isSuccessAddNewAppointment: false,
  messageAddNewAppointment: '',
  isErrorDelAppointment: false,
  isSuccessDelAppointment: false,
  messageDelAppointment: '',
  isErrorEditAppointment: false,
  isSuccessEditAppointment: false,
  messageEditAppointment: '',
};

export const getPatientsByName = createAsyncThunk(
  'patient/getPatientsByName',
  async ({ patientName }, { rejectWithValue }) => {
    try {
      return await getPatientByName(patientName);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewAppointment = createAsyncThunk(
  'appointment/addNewAppointment',
  async (
    {
      email,
      firstName,
      lastName,
      phoneNumber,
      age,
      gender,
      city,
      postalCode,
      region,
      isPatient,
      patientCreatedBy,
      patientId,
      createdBy,
      appointmentStatus,
      visitDate,
      visitTime,
    },
    { rejectWithValue }
  ) => {
    try {
      return await addAppointment(
        email,
        firstName,
        lastName,
        phoneNumber,
        age,
        gender,
        city,
        postalCode,
        region,
        isPatient,
        patientCreatedBy,
        patientId,
        createdBy,
        appointmentStatus,
        visitDate,
        visitTime
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAppointments = createAsyncThunk(
  'appointment/getAppointments',
  async (rejectWithValue) => {
    try {
      return await getAppointmentList();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const delAppointment = createAsyncThunk(
  'appointment/delAppointment',
  async (patientId, { rejectWithValue }) => {
    try {
      return await deleteAppointment(patientId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editAppointments = createAsyncThunk(
  'appointment/editAppointments',
  async (
    { patientId, createdBy, appointmentStatus, visitDate, visitTime },
    { rejectWithValue }
  ) => {
    try {
      return await editAppointment({
        patientId,
        createdBy,
        appointmentStatus,
        visitDate,
        visitTime,
      });
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    resetReducerAppointment: (state) => {
      state.isLoadingPatientsListByName = false;
      state.isSuccessPatientsListByName = false;
      state.isErrorPatientsListByName = false;
      state.messagePatientsListByName = '';
      state.patientsListByName = null;
      state.isErrorAddNewAppointment = false;
      state.isSuccessAddNewAppointment = false;
      state.messageAddNewAppointment = '';
      state.messageDelAppointment = '';
      state.isSuccessDelAppointment = false;
      state.isErrorDelAppointment = false;
      state.messageEditAppointment = '';
      state.isErrorEditAppointment = false;
      state.isSuccessEditAppointment = false;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getPatientsByName.pending, (state) => {
        state.isLoadingPatientsListByName = true;
      })
      .addCase(getPatientsByName.fulfilled, (state, action) => {
        state.isLoadingPatientsListByName = false;
        state.isSuccessPatientsListByName = true;
        state.patientsListByName = action.payload.patients;
      })
      .addCase(getPatientsByName.rejected, (state, action) => {
        state.isLoadingPatientsListByName = false;
        state.isErrorPatientsListByName = true;
        state.messagePatientsListByName = action.payload;
        state.patientsListByName = null;
      })

      .addCase(addNewAppointment.pending, (state) => {
        state.isLoadingAddNewAppointment = true;
      })
      .addCase(addNewAppointment.fulfilled, (state, action) => {
        state.isLoadingAddNewAppointment = false;
        state.isSuccessAddNewAppointment = true;
        state.messageAddNewAppointment = action.payload.message;
      })
      .addCase(addNewAppointment.rejected, (state, action) => {
        state.isLoadingAddNewAppointment = false;
        state.isErrorAddNewAppointment = true;
        state.messageAddNewAppointment = action.payload.message;
        // state.appointments = null;
      })
      .addCase(getAppointments.pending, (state) => {
        state.isLoadingAddNewAppointment = true;
      })
      .addCase(getAppointments.fulfilled, (state, action) => {
        state.isLoadingGetAppointments = false;
        state.isSuccessGetAppointments = true;
        state.appointmentList = action.payload;
      })
      .addCase(getAppointments.rejected, (state, action) => {
        state.isLoadingGetAppointments = false;
        state.isErrorGetAppointments = true;
        state.messageGetAppointments = action.payload;
        state.appointmentList = null;
      })
      .addCase(editAppointments.pending, (state) => {
        state.isLoadingEditAppointment = true;
      })
      .addCase(editAppointments.fulfilled, (state, action) => {
        state.isLoadingEditAppointment = false;
        state.isSuccessEditAppointment = true;
        state.messageEditAppointment = action.payload.message;
      })
      .addCase(editAppointments.rejected, (state, action) => {
        state.isLoadingEditAppointment = false;
        state.isErrorEditAppointment = true;
        state.messageEditAppointment = action.payload.message;
      })
      .addCase(delAppointment.pending, (state) => {
        state.isLoadingAddNewAppointment = true;
      })
      .addCase(delAppointment.fulfilled, (state, action) => {
        state.isSuccessDelAppointment = true;
        state.messageDelAppointment = action.payload.message;
      })
      .addCase(delAppointment.rejected, (state, action) => {
        state.isErrorDelAppointment = true;
        state.messageDelAppointment = action.payload.message;
        // state.appointments = null;
      });
  },
});

export const { resetReducerAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
