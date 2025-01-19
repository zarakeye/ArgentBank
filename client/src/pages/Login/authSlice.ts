import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type { AuthState, Credentials, User, ApiError } from '../../services/api.types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

const initialState: AuthState = {
  token: null,
  user: null,
  error: null,
  loading: false
};

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
      const token = auth.token;

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
    /**
     * Updates the authentication token in the state.
     *
     * This reducer function updates the `token` field in the Redux state
     * with the new token value provided in the action's payload.
     *
     * @param {AuthState} state - The current state of the authentication slice.
     * @param {PayloadAction<string>} action - The action object containing
     * the new authentication token as a string.
     */
    setToken: (state: AuthState, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    
    /**
     * Initializes the authentication state with provided payload data.
     *
     * This reducer function merges the current authentication state with the 
     * payload data from the dispatched action. It resets any existing error 
     * state to null, ensuring a clean state update. Typically used to set 
     * the initial authentication state upon successful login or session restore.
     *
     * @param {AuthState} state - The current state of the authentication slice.
     * @param {PayloadAction<AuthState>} action - The action object containing 
     * a payload with the new authentication state data.
     */
    initAuth: (state: AuthState, action: PayloadAction<AuthState>) => {
      return {
        ...state,
        ...action.payload,
        error: null,
      };
    },
    logout: (state: AuthState): AuthState => {
      return {
        ...state,
        token: null,
        user: null,
        error: null,
        loading: false,
      }
    },
  },
  
  /**
   * A function that accepts a `builder` callback and returns an object defining
   * additional reducers that will be automatically passed to the `createSlice`
   * `reducers` option.
   *
   * In this case, we are defining reducers for the `login`, `fetchProfile`, and
   * `updateProfile` actions.
   *
   * When the `login` action is pending, we set `loading` to `true` and `error` to
   * `null`. When the `login` action is fulfilled, we set `loading` to `false` and
   * `token` to the action's payload. When the `login` action is rejected, we set
   * `loading` to `false` and `error` to the action's payload's message, or
   * 'An error occurred while logging in' if the payload is `undefined`.
   *
   * When the `fetchProfile` action is pending, we set `loading` to `true` and
   * `error` to `null`. When the `fetchProfile` action is fulfilled, we set
   * `loading` to `false` and `user` to the action's payload. When the
   * `fetchProfile` action is rejected, we set `loading` to `false` and `error` to
   * the action's payload's message, or 'Failed to fetch profile' if the payload
   * is `undefined`. If the rejection payload has a `status` property with the
   * value `401`, we also set `token` and `user` to `null`.
   *
   * When the `updateProfile` action is pending, we set `loading` to `true` and
   * `error` to `null`. When the `updateProfile` action is fulfilled, we set
   * `loading` to `false` and `user` to the action's payload. When the
   * `updateProfile` action is rejected, we set `loading` to `false` and `error` to
   * the action's payload's message, or 'Failed to update profile' if the payload
   * is `undefined`.
   */
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

