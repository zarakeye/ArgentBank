import { Navigate, useLocation, Outlet } from 'react-router-dom';
// import { useAppSelector } from '../../app/hooks';
// import { RootState } from '../../app/store';

const ProtectedRoute: React.FC = () => {
  // const { token } = useAppSelector((state: RootState) => state.auth);
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