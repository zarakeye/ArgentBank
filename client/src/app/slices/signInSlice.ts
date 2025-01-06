import { createSlice } from '@reduxjs/toolkit';

export interface SignInInfos {
  username: string;
  password: string;
  rememberMe: boolean;
}

export const signInSlice = createSlice({
  name: 'signIn',
  initialState: {
    username: '',
    password: '',
    rememberMe: false,
  } as SignInInfos,
  reducers: {
    authenticate: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { authenticate } = signInSlice.actions;

export default signInSlice.reducer;