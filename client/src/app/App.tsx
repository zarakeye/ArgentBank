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
