import React, { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setToken, login } from "./authSlice";
import type { Credentials } from "../../services/api.types";
import routes from "../../routes";

const MAIN = "flex flex-col flex-1 justify-start"
const BG_DARK = "bg-[#12002b]"
const SIGN_IN_CONTENT = "box-border bg-white w-[300px] mx-auto my-0 mt-[3rem] p-[2rem]"
const SIGN_IN_ICON = "text-[5rem]"
const SIGN_IN_BUTTON = "block w-full p-[8px] text-[1.1rem] font-[bold] mt-[1rem] bg-[#00bc77] text-white underline font-bold font-sans"
const INPUT_WRAPPER = "flex flex-col text-left mb-[1rem]"
const INPUT_REMEMBER = "flex"

const Login: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useAppSelector(state => state.auth);

  const  [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const credentials: Credentials = {
    email: formData.email,
    password: formData.password,
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const loginResult = await dispatch(login(credentials)).unwrap();
      dispatch(setToken(loginResult));
    } catch (error) {
      console.error("An error occurred while logging in: ", error);
    }
  };

  useEffect(() => {
    if (token !== null) {
      navigate(routes.Profile, { replace: true });
    }
  }, [token, navigate]);

  return (
    <main className={`${MAIN} ${BG_DARK}`}>
      <section className={SIGN_IN_CONTENT}>
        <i className={`fa fa-user-circle ${SIGN_IN_ICON}`}></i>
        <h1 className="text-[24px] font-bold my-[1.2rem]">Sign In</h1>

        {error && (
          <div className="text-red-500">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className={INPUT_WRAPPER}>
            <label htmlFor="username" className="text-[16px] font-bold">Username</label>
            <input type="text" id="username" name="username" className="border-solid border-[1px] border-black pl-[5px]" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>

          <div className={INPUT_WRAPPER}>
            <label htmlFor="password" className="text-[16px] font-bold">Password</label>
            <input type="password" id="password" name="password" className="border-solid border-[1px] border-black pl-[5px]" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          </div>

          <div className={INPUT_REMEMBER}>
            <input type="checkbox" id="remember-me" name="remember-me" checked={formData.rememberMe} className="mr-[7px] my-[3px]" onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })} />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button
            type="submit"
            className={SIGN_IN_BUTTON}
            disabled={loading}  
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;