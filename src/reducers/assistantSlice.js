import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  addUser,
  getUsersList,
  deleteUserInfo,
  editUser,
  activateUser,
} from '../actions/assistantAction';

const initialState = {
  usersList: [],
  assistance: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  isDeleted: false,
  isUpdate: false,
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
    return await getUsersList();
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
  async (userId, thunkAPI) => {
    try {
      return await deleteUserInfo(userId);
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

export const updateUser = createAsyncThunk(
  'auth/editUser',
  async (
    email,
    fullName,
    phoneNumber,
    country,
    state,
    city,
    address,
    zipCode,
    company,
    role,

    thunkAPI
  ) => {
    try {
      return await editUser(
        email,
        fullName,
        phoneNumber,
        country,
        state,
        city,
        address,
        zipCode,
        company,
        role
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

export const assistantSlice = createSlice({
  name: ' assistants',
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
      .addCase(addUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.assistance = action.payload.createdUser;
      })
      .addCase(addUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.assistance = null;
      })

      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.usersList = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error;
        state.usersList = null;
      })

      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isDeleted = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isDeleted = false;
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

export const { reset } = assistantSlice.actions;
export default assistantSlice.reducer;
