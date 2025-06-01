import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import type { ApiError, AuthState, Credentials, User } from '../../services/api.types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/v1';

const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
  loadingProfile: false
};

export const login = createAsyncThunk<
  User,
  Credentials,
  {
    state: RootState;
    rejectValue: ApiError;
  }
>
(
  'auth/login',
  async (credentials: Credentials, { rejectWithValue }) => {
    const { email, password } = credentials;
    try {
      const response = await fetch(
        `${BASE_URL}/user/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ email, password }),
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
      return body;
    } catch (error) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'An unknown error occured',
        status: 500
      });
    }
  }
);

export const fetchProfile = createAsyncThunk<
  User,
  void,
    {
      state: RootState;
      rejectValue: ApiError | null;
    }
>(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/user/profile`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        let errorData;

        try {
          errorData = await response.json();
        } catch {
          errorData = { message: 'Failed to fetch profile' };
        }

        // Si non authentifié, on retourne null pour éviter une erreur visible
        if (response.status === 401) {
          return rejectWithValue({ message: 'Unauthorized', status: 401 });
        }
        
        return rejectWithValue({
          message: errorData.message || 'Failed to fetch profile',
          status: response.status
        });
      }

      const data = await response.json();

      return data.body as User;
    } catch (error) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'unknown error',
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
  async (user: User, {/*getState,*/ rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/user/profile`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
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

export const logoutUser = createAsyncThunk<
  void,
  void,
  {
    state: RootState;
    rejectValue: ApiError;
  }
>(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/user/logout`, {
        method: 'POST',
        credentials: 'include', // ✅ indispensable pour que le cookie soit supprimé côté serveur
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        return rejectWithValue({
          message: errorData.message || 'Logout failed',
          status: response.status,
        });
      }

      return;
    } catch (error) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'Unknown logout error',
        status: 500,
      });
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? 'An error occurred while logging in';
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loadingProfile = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loadingProfile = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loadingProfile = false;
        if (action.payload?.status === 401) {
          state.user = null;
          // state.error = action.payload.message;
          return;
        }
        
        if (action.payload) {
          state.error = action.payload.message
        } else {
          state.error = null;
        }
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
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.error = null;
        state.loading = false;
    })
    .addCase(logoutUser.rejected, (state, action) => {
      state.error = action.payload?.message || 'Logout failed';
    })
  },
});

export const { initAuth, logout } = authSlice.actions;
export default authSlice.reducer;

