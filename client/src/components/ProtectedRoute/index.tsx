import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchProfile } from '../../pages/Login/authSlice';

/**
 * A protected route component that will only render its children if the user is authenticated.
 *
 * The component will redirect to the login page if the user is not authenticated.
 *
 * @returns {JSX.Element} The protected route component.
 */
const ProtectedRoute: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loadingProfile } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(fetchProfile());
    }
  }, [dispatch, user]);

  if (loadingProfile) {
    console.log('PublicRoute state when loadingProfile=true: ', {user, loadingProfile});
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log('PublicRoute state when user=false: ', {user, loadingProfile});
    return <Navigate to="/"/* state={{ from: location }} replace*/ />;
  }

  console.log('PublicRoute state: ', {user, loadingProfile});
  return <Outlet/>;
}

export default ProtectedRoute;