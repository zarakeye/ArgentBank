import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Footer from '../components/Footer';
import './App.css'
import ProtectedRoute from '../components/ProtectedRoute';
import { useAppDispatch } from './hooks';
import { initAuth, fetchProfile } from '../pages/Login/authSlice';
import routes from '../routes';

/**
 * The main application component that sets up routing and initializes
 * authentication state from localStorage. It uses React Router for navigation
 * and manages user authentication by dispatching actions to the Redux store.
 * 
 * - Retrieves the token from localStorage and, if present, checks for user data.
 * - Dispatches `fetchProfile` if user data is not found in localStorage.
 * - Initializes authentication state using `initAuth` if user data is available.
 * - Sets up routes for Home, Login, and Profile pages using ProtectedRoute for
 *   the Profile route, which requires authentication.
 * 
 * @returns {JSX.Element} The application's main structure including Header, 
 * Routes, and Footer components.
 */
const App: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      
      if (!user) {
        dispatch(fetchProfile());
      } else {
        dispatch(initAuth({
          token,
          user,
          error: null,
          loading: false,
        }));
      }
    }
  }, [dispatch, token]);

  return (
  <>
    <Header />
    <Routes>
    { (useLocation().pathname !== routes.Profile && token === null) ? (
      <>
      <Route path={routes.Home} element={<Home />} />
      <Route path={routes.Login} element={<Login />} />
      </>
      ) : (
      <>
      <Route path={routes.Home} element={<Profile />} />
      <Route path={routes.Login} element={<Profile />} />
      </>
      )
    }  
    <Route element={<ProtectedRoute />}>
      <Route path={routes.Profile} element={<Profile />} />
    </Route>
    </Routes>
    <Footer />
  </>        
  )
}

export default App
