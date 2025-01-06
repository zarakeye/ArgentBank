import React from "react";
import { authenticate } from "../../app/slices/signInSlice";
import { useSelector, useDispatch } from "react-redux";
import { SignInInfos } from "../../app/slices/signInSlice";

const MAIN = "flex-1 "
const BG_DARK = "bg-[#12002b]"
const SIGN_IN_CONTENT = "box-border bg-white w-[300px] mx-auto my-0 mt-[3rem] p-[2rem]"
const SIGN_IN_ICON = "text-[5rem]"
const SIGN_IN_BUTTON = "block w-full p-[8px] text-[1.1rem] font-[bold] mt-[1rem]"
const INPUT_WRAPPER = "flex flex-col text-left mb-[1rem]"
const INPUT_REMEMBER = "flex"

const SignIn: React.FC = (): JSX.Element => {
  const signIn = useSelector((state: { signIn: SignInInfos }) => state.signIn);
  console.log('signIn state in component: ', signIn);
  const dispatch = useDispatch();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElements = (e.target as HTMLFormElement).elements;
    const username = (formElements.namedItem("username") as HTMLInputElement).value;
    const password = (formElements.namedItem("password") as HTMLInputElement).value;
    const rememberMe = (formElements.namedItem("remember-me") as HTMLInputElement).checked;
    dispatch(authenticate({username, password, rememberMe}));
    console.log('signIn: ', signIn);
  };

  return (
    <main className={`${MAIN} ${BG_DARK}`}>
      <section className={SIGN_IN_CONTENT}>
        <i className={`fa fa-user-circle ${SIGN_IN_ICON}`}></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className={INPUT_WRAPPER}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className={INPUT_WRAPPER}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className={INPUT_REMEMBER}>
            <input type="checkbox" id="remember-me" name="remember-me"  />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {/* PLACEHOLDER DUE TO STATIC SITE */}
          {/* <a href="./user.html" className={SIGN_IN_BUTTON}>Sign In</a> */}

          {/* SHOULD BE THE BUTTON BELOW */}
          <button type="submit" className={SIGN_IN_BUTTON}>Sign In</button>
          {/* */}
        </form>
      </section>
    </main>
  );
};

export default SignIn;