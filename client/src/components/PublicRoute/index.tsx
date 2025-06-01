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
const PublicRoute: React.FC = (): JSX.Element => {
  const { user, loadingProfile } = useAppSelector(state => state.auth);

  if (loadingProfile) {
    console.log('PublicRoute state when loadingProfile=true: ', {user, loadingProfile});
    return <div className="text-white text-center mt-8">Checking session...</div>;
  }

  if (user) {
    console.log('PublicRoute state when user=true: ', {user, loadingProfile});
    return <Navigate to='/profile' replace />;
  }

  console.log('PublicRoute state: ', {user, loadingProfile});
  return <Outlet/>
}

export default PublicRoute