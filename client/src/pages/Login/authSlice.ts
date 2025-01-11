import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type { AuthState, Credentials, User } from '../../services/api.types';
// import axios, { AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

// interface ErrorResponse {
//   message: string;
// }

const initialState: AuthState = {
  token: null,
  user: null,
  error: null,
  loading: false,
};

// const api = axios.create({
//   baseURL: BASE_URL,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export const login = createAsyncThunk<
  string,
  Credentials,
  {
    state: RootState;
    rejectValue: string;
  }
>
(
  'auth/login',
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      // const response = await api.post(
      //   '/user/login',
      //   credentials
      // );

      // const {token} = response.data.body;
      // console.log("token", token);
      // localStorage.setItem('token', token);
      // return token;

      const response = await fetch(
        `${BASE_URL}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        }
      );

      const {body} = await response.json();
      return body.token;
    } catch (error: unknown) {
      // if (error instanceof AxiosError) {
      //   const axiosError = error as AxiosError;
      //   if (axiosError.response) {
      //     const errorResponse = axiosError.response.data as ErrorResponse;
      //     return rejectWithValue(errorResponse.message || 'An error occurred while logging in');
      //   }
      // }
      // return rejectWithValue("An error occurred while logging in");
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An error occurred while logging in");
    }
  }
);

export const fetchProfile = createAsyncThunk<
  User,
  void,
    {
      state: RootState;
      rejectValue: string;
    }
>(
  'auth/fetchProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      // const {auth} = getState() as RootState;
      // const response = await api.get(
      //   '/user/profile', {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${auth.token}`,
      //     },
      //   }
      // );

      const {auth} = getState() as RootState;
      const response = await fetch(
        `${BASE_URL}/user/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`,
          },
        }
      );

      const {body} = await response.json();
      localStorage.setItem('user', JSON.stringify(body));
      return body;
    } catch (error: unknown) {
      // if (error instanceof AxiosError) {
      //   const axiosError = error as AxiosError;
      //   if (axiosError.response) {
      //     const errorResponse = axiosError.response.data as ErrorResponse;
      //     return rejectWithValue(errorResponse.message || 'Failed to fetch profile');
      //   }
      // }
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch profile");
    }
  }
);

export const updateProfile = createAsyncThunk<
  User,
  User,
  {
    state: RootState;
    rejectValue: string;
  }
>(
  'auth/updateProfile',
  async (user: User, { getState, rejectWithValue }) => {
    try {
      const {auth} = getState() as RootState;
      // const response = await api.put(
      //   '/user/profile', user, {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${auth.token}`,
      //     },
      //   }
      // );

      const response = await fetch(
        `${BASE_URL}/user/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`,
          },
          body: JSON.stringify(user),
        }
      )
      const {body} = await response.json();
      return body;
    } catch (error: unknown) {
      // if (error instanceof AxiosError) {
      //   const axiosError = error as AxiosError;
      //   if (axiosError.response) {
      //     const errorResponse = axiosError.response.data as ErrorResponse;
      //     return rejectWithValue(errorResponse.message || 'Failed to update profile');
      //   }
      // }

      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to update profile");
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string ?? 'An error occurred while logging in';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string ?? 'Failed to fetch profile';
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string ?? 'Failed to fetch profile';
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;

