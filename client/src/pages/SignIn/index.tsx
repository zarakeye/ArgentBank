import React from "react";

const style = {
  main: "flex-1 ",
  bgDark: "bg-[#12002b]",
  signInContent: "box-border bg-white w-[300px] mx-0 my-auto mt-[3rem] p-[2rem]",
  signInIcon: "text-[5rem]",
  signInButton: "block w-full p-[8px] text-[1.1rem] font-[bold] mt-[1rem]",
  inputWrapper: "flex flex-col text-left mb-[1rem]",
  inputRemember: "flex",
};

const SignIn: React.FC = (): JSX.Element => {
  return (
    <main className={`${style.main} ${style.bgDark}`}>
      <section className={style.signInContent}>
        <i className={`fa fa-user-circle ${style.signInIcon}`}></i>
        <h1>Sign In</h1>
        <form>
          <div className={style.inputWrapper}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className={style.inputWrapper}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className={style.inputRemember}>
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {/* PLACEHOLDER DUE TO STATIC SITE */}
          <a href="./user.html" class="sign-in-button">Sign In</a>
          {/* SHOULD BE THE BUTTON BELOW */}
          {/* <button class="sign-in-button">Sign In</button> */}
          {/* */}
        </form>
      </section>
    </main>
  );
};

export default SignIn;