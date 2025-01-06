import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import signInReducer from './slices/signInSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    signIn: signInReducer,
  },
});