import { Navigate, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useRef } from 'react';


const ProtectedRoute: React.FC = () => {
  const { token } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const {pathname} = useLocation();
  const navigate = useNavigate();
  const historyLengthRef = useRef(window.history.length);

  useEffect(() => {
    /**
     * Handles the popstate event and prevents the browser from navigating away
     * from the current route when the user presses the back button. Instead, it
     * updates the history to the current route.
     * @param {PopStateEvent} e - The popstate event object.
     */
    const handlePopstate = (e: PopStateEvent) => {
      e.preventDefault();
      if (window.history.length < historyLengthRef.current) {
        window.history.pushState(null, document.title, window.location.href);
        historyLengthRef.current = window.history.length;
      } else {
        historyLengthRef.current = window.history.length;
      }
    };

    window.history.pushState(null, document.title, window.location.href);
    historyLengthRef.current = window.history.length;

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [ token, dispatch, pathname, navigate]);

  if (!token) {
    return <Navigate to="/" state={{ from: pathname }} replace />;
  }

  return <Outlet/>;
}

export default ProtectedRoute;