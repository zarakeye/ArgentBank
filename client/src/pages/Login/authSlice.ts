import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type { AuthState, Credentials, User, ApiError } from '../../services/api.types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

const getInitialState = (): AuthState => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  return {
    token,
    user,
    error: null,
    loading: false,
  };
};

const initialState: AuthState = getInitialState();

export const login = createAsyncThunk<
  string,
  Credentials,
  {
    state: RootState;
    rejectValue: ApiError;
  }
>
(
  'auth/login',
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        return rejectWithValue({
          message: errorData.message || 'Login failed',
          status: response.status,
        });
      }

      const {body} = await response.json();
      localStorage.setItem('token', body.token)
      return body.token;
    } catch (error) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'An unknown error occured'
      });
    }
  }
);

export const fetchProfile = createAsyncThunk<
  User,
  void,
    {
      state: RootState;
      rejectValue: ApiError;
    }
>(
  'auth/fetchProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const {auth} = getState() as RootState;
      const token = auth.token || localStorage.getItem('token');

      if (!token) {
        return rejectWithValue({
          message: 'No authentication token found',
          status: 401
        });
      }
      const response = await fetch(
        `${BASE_URL}/user/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        
        return rejectWithValue({
          message: errorData.message || 'Failed to fetch profile',
          status: response.status
        });
      }

      const {body} = await response.json();
      localStorage.setItem('user', JSON.stringify(body));
      return body;
    } catch (error) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'Failed to fetch profile'
      });
    }
  }
);

export const updateProfile = createAsyncThunk<
  User,
  User,
  {
    state: RootState;
    rejectValue: ApiError;
  }
>(
  'auth/updateProfile',
  async (user: User, { getState, rejectWithValue }) => {
    try {
      const {auth} = getState() as RootState;
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

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({
          message: errorData.message || 'Failed to update profile',
          status: response.status
        });
      }

      const {body} = await response.json();
      return body;
    } catch (error: unknown) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'Failed to update profile',
      });
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    initAuth: (state, action) => {
      return {
        ...state,
        ...action.payload,
        error: null,
      };
    },
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        token: null,
        user: null,
        error: null,
        loading: false,
      }
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
        state.error = action.payload?.message ?? 'An error occurred while logging in';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? 'Failed to fetch profile';

        if (action.payload?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          state.token = null;
          state.user = null;
        }
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
        state.error = action.payload?.message ?? 'Failed to fetch profile';
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const { setToken, initAuth, logout } = authSlice.actions;
export default authSlice.reducer;

