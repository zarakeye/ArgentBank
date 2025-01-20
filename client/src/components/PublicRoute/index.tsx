import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

/**
 * PublicRoute is a component that renders its child routes if the user
 * is not authenticated. If the user is authenticated, it redirects 
 * to the login page.
 *
 * @returns {JSX.Element} The public route component, which either renders
 * the child routes if not authenticated or navigates to login if authenticated.
 */
const PublicRoute: React.FC = () => {
  const { token, user } = useAppSelector(state => state.auth);

  if (token && user) {
    return <Navigate to='/profile' replace />;
  }

  return <Outlet/>
}

export default PublicRoute