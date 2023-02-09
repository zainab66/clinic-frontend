import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addUser,
  getAssistantList,
  deleteUserInfo,
  editUser,
  activateUser,
} from '../actions/assistantAction';

const initialState = {
  assistantsList: [],
  assistance: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  isUpdate: false,
  isSuccessGetAssisstantList: false,
  deleteMessage: '',
};

// Register user
export const addUsers = createAsyncThunk(
  'auth/addUser',
  async ({ email, fullName, role, createdBy }, { rejectWithValue }) => {
    try {
      return await addUser(email, fullName, role, createdBy);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const activateAssistance = createAsyncThunk(
  'auth/activateAssistance',
  async (token, { rejectWithValue }) => {
    try {
      return await activateUser(token);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUsers = createAsyncThunk('auth/getUsers', async (thunkAPI) => {
  try {
    return await getAssistantList();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteUser = createAsyncThunk(
  'auth/deleteUser',
  async (userId, { rejectWithValue }) => {
    try {
      return await deleteUserInfo(userId);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/editUser',
  async (
    {
      email,
      fullName,
      phoneNumber,
      age,
      gender,
      city,
      region,
      postalCode,
      role,
      createdBy,
      assisstantId,
    },

    { rejectWithValue }
  ) => {
    try {
      return await editUser({
        email,
        fullName,
        phoneNumber,
        age,
        gender,
        city,
        region,
        postalCode,
        role,
        createdBy,
        assisstantId,
      });
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const assistantSlice = createSlice({
  name: ' assistants',
  initialState,
  reducers: {
    resetAssisstanceReducer: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.messageAddAssisstant = '';
      state.isSuccessAddAssisstant = false;
      state.isErrorAddAssisstant = false;
      state.deleteMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUsers.fulfilled, (state, action) => {
        // state.isLoading = false;
        state.isSuccessAddAssisstant = true;
        state.isErrorAddAssisstant = false;
        state.messageAddAssisstant = action.payload.message;
        state.assistance = action.payload.createdUser;
      })
      .addCase(addUsers.rejected, (state, action) => {
        state.isSuccessAddAssisstant = false;
        state.isErrorAddAssisstant = true;
        state.messageAddAssisstant = action.payload.message;
        state.assistance = null;
      })

      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isSuccessGetAssisstantList = true;
        state.assistantsList = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccessGetAssisstantList = false;
        state.isErrorGetAssisstantList = true;
        state.messageGetAssisstantList = action.error;
        state.assistantsList = null;
      })

      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isError = false;
        state.isSuccess = true;
        state.deleteMessage = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isSuccess = false;
        state.isError = true;
        state.deleteMessage = action.payload.message;
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isUpdate = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isUpdate = false;
      });
  },
});

export const { resetAssisstanceReducer } = assistantSlice.actions;
export default assistantSlice.reducer;
