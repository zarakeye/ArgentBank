import { Navigate, useLocation, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('token');
  const {pathname} = useLocation();
  console.log('pathname', pathname);

  if (!token) {
    console.log('token', token);
    return <Navigate to="/sign-in" state={{ from: pathname }} replace />;
  }

  return <Outlet/>;
}

export default ProtectedRoute;