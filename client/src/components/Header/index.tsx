import React, { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/argentBankLogo.svg";
import routes from "../../routes";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { logout } from "../../pages/Login/authSlice";

const MAIN_NAV = "flex justify-between items-center px-[20px] py-[5px]";
const MAIN_NAV_LINK = "font-bold text-[#2c3e50]"
const MAIN_NAV_LINK_ACTIVE = "hover:text-underlined"
const MAIN_NAV_LOGO = "flex items-center"
const MAIN_NAV_LOGO_IMAGE = "w-[200px]"

const Header: React.FC = (): JSX.Element => {
  const {pathname} = useLocation();
  const { token, user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userFromStorage = localStorage.getItem('user');
  const tokenFromStorage = localStorage.getItem('token');
  const userObject = userFromStorage ? JSON.parse(userFromStorage) : null;

  const handleClick = () => {
    dispatch(logout());
    console.log('logout: localStorage(user)', localStorage.getItem('user'), 'localStorage(token)', localStorage.getItem('token'), 'token', token, 'user', user);
    // setTimeout(() => {
    //   navigate(routes.Home, { replace: true });
    // }, 10);
  }

  useEffect(() => {
    if (pathname === routes.Profile && tokenFromStorage === null) {
      navigate(routes.Home/*, { replace: true }*/);
    }
  }, [tokenFromStorage, pathname, navigate]);

  return (
    <header className={MAIN_NAV}>
      {pathname === routes.Profile ? (
        <Link to="/profile" className={MAIN_NAV_LOGO}>
          <img src={logo} alt="Argent Bank Logo" className={MAIN_NAV_LOGO_IMAGE} />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
      ) : (
        <Link to="/" className={MAIN_NAV_LOGO}>
          <img src={logo} alt="Argent Bank Logo" className={MAIN_NAV_LOGO_IMAGE} />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
      )}
      <div>
        <nav>
          <ul className="flex">
            {(pathname === routes.Home || pathname === routes.Login) && (
            <li className="list-none">
              <NavLink to="/login" className={`${MAIN_NAV_LINK_ACTIVE}`}>
                <i className="fa fa-user-circle inline-block mr-[5px]"></i>
                Sign In
              </NavLink>
            </li>
            )}
            {pathname === routes.Profile && (
            <>
            <li className="list-none mr-[8px]">
              <NavLink to="/profile"  className={`${MAIN_NAV_LINK_ACTIVE}`}>
                <i className="fa fa-user-circle inline-block mr-[5px]"></i>
                {userObject?.firstName}
              </NavLink>
            </li>
            <li>
              <NavLink to="/"  className={`${MAIN_NAV_LINK} ${MAIN_NAV_LINK_ACTIVE}`} onClick={handleClick}>
                <i className="fa fa-sign-out inline-block mr-[5px]"></i>
                Sign Out
              </NavLink>
            </li>
            </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;