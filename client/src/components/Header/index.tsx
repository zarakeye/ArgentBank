import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/argentBankLogo.svg";
import routes from "../../routes";
import { useAppSelector } from "../../app/hooks";

const MAIN_NAV = "flex justify-between items-center px-[20px] py-[5px]";
const MAIN_NAV_LINK = "font-bold text-[#2c3e50]"
const MAIN_NAV_LINK_ACTIVE = "hover:text-underlined"
const MAIN_NAV_LOGO = "flex items-center"
const MAIN_NAV_LOGO_IMAGE = "w-[200px]"

const Header: React.FC = (): JSX.Element => {
  const {pathname} = useLocation();
  const { user } = useAppSelector(state => state.auth);

  return (
    <header className={MAIN_NAV}>
      <Link to="/" className={MAIN_NAV_LOGO}>
        <img src={logo} alt="Argent Bank Logo" className={MAIN_NAV_LOGO_IMAGE} />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <nav>
          <ul className="flex">
            {(pathname === routes.Home || pathname === routes.SignIn) && (
            <li className="list-none">
              <NavLink to="/sign-in" className={MAIN_NAV_LINK_ACTIVE}>
                <i className="fa fa-user-circle"></i>
                Sign In
              </NavLink>
            </li>
            )}
            {pathname === routes.User && (
            <>
            <li className="list-none mr-[8px]">
              <NavLink to="/user"  className={MAIN_NAV_LINK_ACTIVE}>
                <i className="fa fa-user-circle"></i>
                {user?.firstName}
              </NavLink>
            </li>
            <li>
              <NavLink to="/"  className={`${MAIN_NAV_LINK} ${MAIN_NAV_LINK_ACTIVE}`} onClick={() => localStorage.removeItem('token')}>
                <i className="fa fa-sign-out"></i>
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