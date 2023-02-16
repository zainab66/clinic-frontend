import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  editUser,
  doctorRegister,
  signin,
  userLogout,
  forgotPassword,
  resetPasswordUser,
  getUser,
} from '../actions/authActions';

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  messageEditProfile: '',
  isErrorEditProfile: false,
  isSuccessEditProfile: false,
  messageGetUserProfile: '',
  isErrorGetUserProfile: false,
  isSuccessGetUserProfile: false,
  userProfile: {},
};

// Register user
export const signup = createAsyncThunk(
  'auth/register',
  async (name, email, password, role, thunkAPI) => {
    try {
      return await doctorRegister(name, email, password, role);
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

// Login user
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await signin(email, password);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  userLogout();
});

export const userForgotPassword = createAsyncThunk(
  'auth/userForgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      return await forgotPassword(email);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      return await resetPasswordUser(token, password);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editProfile = createAsyncThunk(
  'auth/editProfile',
  async (formData, { rejectWithValue }) => {
    try {
      return await editUser(formData);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (id, { rejectWithValue }) => {
    try {
      return await getUser(id);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetReducer: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
      state.messageEditProfile = '';
      state.isErrorEditProfile = false;
      state.isSuccessEditProfile = false;
      state.messageGetUserProfile = '';
      state.isErrorGetUserProfile = false;
      state.isErrorGetUserProfile = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(userForgotPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userForgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(userForgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(editProfile.pending, (state) => {
        state.isLoadingEditProfile = true;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.isLoadingEditProfile = false;
        state.isSuccessEditProfile = true;
        state.messageEditProfile = action.payload.message;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.isLoadingEditProfile = false;
        state.isErrorEditProfile = true;
        state.messageEditProfile = action.payload.message;
      })

      .addCase(getUserProfile.pending, (state) => {
        state.isLoadingGetUserProfile = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoadingGetUserProfile = false;
        state.isSuccessGetUserProfile = true;
        state.messageGetUserProfile = action.payload.message;
        state.userProfile = action.payload.profile;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoadingGetUserProfile = false;
        state.isErrorGetUserProfile = true;
        state.messageGetUserProfile = action.payload.message;
      });
  },
});

export const { resetReducer } = authSlice.actions;
export default authSlice.reducer;
