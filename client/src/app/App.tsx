import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Footer from '../components/Footer';
import './App.css'
import PublicRoute from '../components/PublicRoute';
import ProtectedRoute from '../components/ProtectedRoute';

/**
 * The main application component.
 *
 * This component renders the main navigation and routing for the application.
 * It includes a public route for the home and login pages, and a protected route
 * for the profile page. The protected route requires the user to be authenticated
 * before rendering the profile page.
 *
 * @returns {JSX.Element} The application component.
 */
const App: React.FC = (): JSX.Element => {
  return (
  <>
    <Header />
    <Routes>
    <Route element={<PublicRoute />}>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
    </Route>
    <Route element={<ProtectedRoute />}>
      <Route path='/profile' element={<Profile />} />
    </Route>
    </Routes>
    <Footer />
  </>        
  )
}

export default App
