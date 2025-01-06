import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/argentBankLogo.svg";
import routes from "../../routes";

const MAIN_NAV = "flex justify-between items-center px-[20px] py-[5px]";
const MAIN_NAV_LINK = "font-bold text-[#2c3e50]"
const MAIN_NAV_LINK_ACTIVE = "hover:text-underlined"
const MAIN_NAV_LOGO = "flex items-center"
const MAIN_NAV_LOGO_IMAGE = "w-[200px]"


const Header: React.FC = (): JSX.Element => {
  const pathname = window.location.pathname;
  console.log(`pathname: ${pathname}`);

  return (
    <header className={MAIN_NAV}>
      <Link to="/" className={MAIN_NAV_LOGO}>
        <img src={logo} alt="Argent Bank Logo" className={MAIN_NAV_LOGO_IMAGE} />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <nav>
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
          <li className="list-none">
            <NavLink to="/user/profile"  className={MAIN_NAV_LINK_ACTIVE}>
              <i className="fa fa-user-circle"></i>
              Tony Jarvis
            </NavLink>
          </li>
          <li>
            <NavLink to="/"  className={`${MAIN_NAV_LINK} ${MAIN_NAV_LINK_ACTIVE}`}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </NavLink>
          </li>
          </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;