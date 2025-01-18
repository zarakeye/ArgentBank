import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type { AuthState, Credentials, User, ApiError } from '../../services/api.types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

/**
 * Returns the initial state of the authentication slice from localStorage.
 *
 * The initial state includes the authentication token, the user object, and
 * error and loading flags. The user object is parsed from a JSON string stored
 * in localStorage. If the user object is not present, it is set to null.
 *
 * @returns {AuthState} the initial state of the authentication slice
 */
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
    /**
     * Updates the authentication token in the state and localStorage.
     *
     * This reducer function sets the token value in the Redux state to the 
     * payload of the action. It also persists the token to localStorage 
     * for maintaining authentication state across sessions.
     *
     * @param {AuthState} state - The current state of the authentication slice.
     * @param {PayloadAction<string>} action - The action object containing 
     * a payload with the new token.
     */
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
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
      initAuth: (state, action) => {
      return {
        ...state,
        ...action.payload,
        error: null,
      };
    },

    /**
     * Resets the authentication state and clears localStorage.
     *
     * This reducer function returns a new state object that resets all values
     * to their initial state. It also removes the token and user from
     * localStorage, effectively logging the user out.
     *
     * @param {AuthState} state - The current state of the authentication slice.
     * @returns {AuthState} The new state with all values reset to initial state.
     */
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
  
  /**
   * Defines extra reducers for the authentication slice, which are used to 
   * handle the side effects of asynchronous actions. These reducers are 
   * called when the corresponding action is dispatched, and they update the 
   * state of the authentication slice accordingly.
   * 
   * The extra reducers defined here handle the following actions:
   * - `login.pending`: Sets `loading` to `true` and `error` to `null`.
   * - `login.fulfilled`: Sets `loading` to `false` and `token` to the 
   *   payload of the action.
   * - `login.rejected`: Sets `loading` to `false` and `error` to the 
   *   error message from the action payload, or a default error message if 
   *   none is provided.
   * - `fetchProfile.fulfilled`: Sets `loading` to `false` and `user` to the 
   *   payload of the action.
   * - `fetchProfile.rejected`: Sets `loading` to `false` and `error` to the 
   *   error message from the action payload, or a default error message if 
   *   none is provided. If the error status is 401, it also logs the user out 
   *   by removing the token and user from localStorage and setting them to 
   *   `null` in the state.
   * - `fetchProfile.pending`: Sets `loading` to `true` and `error` to `null`.
   * - `updateProfile.fulfilled`: Sets `loading` to `false` and `user` to the 
   *   payload of the action.
   * - `updateProfile.rejected`: Sets `loading` to `false` and `error` to the 
   *   error message from the action payload, or a default error message if 
   *   none is provided.
   * - `updateProfile.pending`: Sets `loading` to `true` and `error` to `null`.
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

