import React from "react";

const FOOTER = "flex justify-center border-t-solid border-t-[2px] border-t-[#ccc] px-0 pt-[2rem] pb-[1.5rem]";
const FOOTER_TEXT = "m-0 p-0";

/**
 * The Footer component renders a footer with the copyright information.
 * 
 * @returns {JSX.Element} The footer element.
 */
const Footer: React.FC = (): JSX.Element => {
  return (
    <footer className={FOOTER}>
      <p className={FOOTER_TEXT}>Copyright 2020 Argent Bank</p>
    </footer>
  );
};

export default Footer;