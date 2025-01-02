import React from "react";
import { NavLink, useParams } from "react-router-dom";
import logo from "../../assets/argentBankLogo.svg";

const style = {
  mainNav: "flex justify-between items-center p-x-[5px] p-y-[20px]",
  mainNavLogo: "flex items-center",
  mainNavLogoImage: "max-w-full w-[200px]",
};

const Header: React.FC = (): JSX.Element => {
  return (
    <nav className={style.mainNav}>
      <NavLink to="/" className={style.mainNavLogo}>
        <img src={logo} alt="Argent Bank Logo" className={style.mainNavLogoImage} />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        <NavLink to="/" className="main-nav-item">
          <i className="fa fa-home"></i>
          Home
        <a class="main-nav-item" href="./sign-in.html">
          <i class="fa fa-user-circle"></i>
          Sign In
        </a>
      </div>
    </nav>
  );
};

export default Header;