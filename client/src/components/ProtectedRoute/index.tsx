import { Navigate, useLocation, Outlet } from 'react-router-dom';

/**
 * A component that protects certain routes by checking for authentication.
 *
 * It retrieves the authentication token from localStorage and uses it to
 * determine whether the user is authenticated. If the token is not present,
 * the user is redirected to the login page, and the current path is passed
 * in the state for potential redirection after successful login.
 *
 * @returns {JSX.Element} The child components if authenticated, or a 
 * Navigate component to redirect to the login page otherwise.
 */
const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('token');
  const {pathname} = useLocation();
  console.log('pathname', pathname);

  if (!token) {
    console.log('token', token);
    return <Navigate to="/login" state={{ from: pathname }} replace />;
  }

  return <Outlet/>;
}

export default ProtectedRoute;