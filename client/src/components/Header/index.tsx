import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/argentBankLogo.svg";
import routes from "../../routes";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../pages/Login/authSlice";
import type { User } from "../../services/api.types";  

const MAIN_NAV = "flex justify-between items-center px-[20px] py-[5px]";
const MAIN_NAV_LINK = "font-bold text-[#2c3e50]"
const MAIN_NAV_LINK_ACTIVE = "hover:text-underlined"
const MAIN_NAV_LOGO = "flex items-center"
const MAIN_NAV_LOGO_IMAGE = "w-[200px]"

/**
 * The Header component renders the main navigation bar of the Argent Bank website.
 * 
 * It displays a logo on the left and navigation links on the right. The navigation
 * links change depending on the current route. If the user is on the home or login
 * page, it displays a "Sign In" link. If the user is on the profile page, it displays
 * the user's first name and a "Sign Out" link. Clicking on the "Sign Out" link will
 * log the user out and redirect them to the home page.
 */
const Header: React.FC = (): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const {pathname} = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userFromState = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (userFromState) {
      setUser(userFromState);
    }
  }, [user, userFromState]);


  /**
   * Logs the user out by dispatching the logout action and redirects them to
   * the home page.
   */
  const handleSignOut = () => {
    dispatch(logout());
    navigate('/', { replace: true ,  state: { from: window.location.pathname } });
  }

  return (
    <header className={MAIN_NAV}>
      {pathname === routes.Profile ? (
        <Link to={routes.Profile} className={MAIN_NAV_LOGO}>
          <img src={logo} alt="Argent Bank Logo" className={MAIN_NAV_LOGO_IMAGE} />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
      ) : (
        <Link to={routes.Home} className={MAIN_NAV_LOGO}>
          <img src={logo} alt="Argent Bank Logo" className={MAIN_NAV_LOGO_IMAGE} />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
      )}
      <div>
        <nav>
          <ul className="flex">
            {(pathname === routes.Home || pathname === routes.Login) && (
            <li className="list-none">
              <NavLink to={routes.Login} className={`${MAIN_NAV_LINK_ACTIVE}`}>
                <i className="fa fa-user-circle inline-block mr-[5px]"></i>
                Sign In
              </NavLink>
            </li>
            )}
            {pathname === routes.Profile && (
            <>
            <li className="list-none mr-[8px]">
              <NavLink to={routes.Profile}  className={`${MAIN_NAV_LINK_ACTIVE}`}>
                <i className="fa fa-user-circle inline-block mr-[5px]"></i>
                {user?.firstName}
              </NavLink>
            </li>
            <li>
              <NavLink to={routes.Home}  className={`${MAIN_NAV_LINK} ${MAIN_NAV_LINK_ACTIVE}`} onClick={handleSignOut}>
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