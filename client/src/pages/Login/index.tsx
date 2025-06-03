import React, { useState, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { login, fetchProfile } from "./authSlice";
import type { Credentials } from "../../services/api.types";

const MAIN = "flex flex-col flex-1 justify-start"
const BG_DARK = "bg-[#12002b]"
const SIGN_IN_CONTENT = "box-border bg-white w-[300px] mx-auto my-0 mt-[3rem] p-[2rem]"
const SIGN_IN_ICON = "text-[5rem]"
const SIGN_IN_BUTTON = "block w-full p-[8px] text-[1.1rem] font-[bold] mt-[1rem] bg-[#00bc77] text-white underline font-bold font-sans"
const INPUT_WRAPPER = "flex flex-col text-left mb-[1rem]"
const INPUT_REMEMBER = "flex"

/**
 * The Login component renders a login form for user authentication.
 *
 * It provides fields for email, password, and a "Remember me" option.
 * Upon submission, it dispatches a login action and sets the authentication token
 * if successful. If a token is present, it navigates to the profile page.
 *
 * The component displays any error messages from the authentication process
 * and disables the submit button while loading.
 *
 * @returns {JSX.Element} The login form component.
 */
const Login: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useAppSelector(state => state.auth);

  const  [formData, setFormData] = useState(() => {
    const savedUsername = localStorage.getItem('username');
    return {
      username: savedUsername || '',
      password: '',
      rememberMe: !!savedUsername,
    };
  });

  const credentials: Credentials = {
    email: formData.username,
    password: formData.password,
  };

  useEffect(() => {
    if (user) {
      navigate('/profile', { replace: true });
    }
  }, [user, navigate]);

  /**
   * Handles the form submission for the login form.
   *
   * Prevents the default form submission behavior and attempts to log in
   * the user with the provided credentials. Dispatches the login action
   * and sets the authentication token upon successful login.
   *
   * If an error occurs during the login process, it logs the error to
   * the console.
   *
   * @param {FormEvent<HTMLFormElement>} e - The form submission event.
   * @returns {Promise<void>} A promise that resolves when the login
   * process is complete.
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      if (formData.rememberMe) {
        localStorage.setItem('username', formData.username);
      } else {
        localStorage.removeItem('username');
      }

      const resultAction = await dispatch(login(credentials));

      if (login.rejected.match(resultAction)) {
        console.error("Login error:", resultAction.payload);
        return;
      }

      const profileAction = await dispatch(fetchProfile());
      if (fetchProfile.fulfilled.match(profileAction)) {
        navigate('/profile');
      } else {
        console.error("Failed to fetch profile:", profileAction.payload);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };
  
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
            <input type="email" id="username" name="username" className="border-solid border-[1px] border-black pl-[5px]" value={ formData.username } onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
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