import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchProfile } from '../Login/authSlice';
import EditProfile from '../../components/EditProfile';

const MAIN =  "flex flex-col flex-1 pb-[2rem]";
const BG_DARK = "bg-[#12002b]"
const HEADER = "text-white mb-[2rem]"
const TITLE =  "text-[32px] py-[21.5px] font-bold"
const EDIT_BUTTON = "text-[.9rem] font-bold p-[10px]"
const ACCOUNT = "flex flex-col medium:flex-row justify-between items-center border-solid border-[1px] border-black bg-white w-[80%] mx-auto my-0 p-[1.5rem] box-border text-left mb-[2rem]"
const ACCOUNT_CONTENT_WRAPPER = "w-full large:w-auto"
const ACCOUNT_TITLE = "m-0 p-0 text-[1rem] font-normal"
const ACCOUNT_AMOUNT = "m-0 text-[2.5rem] font-bold"
const ACCOUNT_AMOUNT_DESCRIPTION = "m-0"
const TRANSACTION_BUTTON = "block w-full medium:w-[200px] p-[8px] text-[1.1rem] font-bold mt-[1rem] "
const CTA = "border-l border-l-[2px] border-l-[#00bc77] border-t border-t-[2px] border-t-[#00bc77] border-r border-r-[2px] border-r-[#1f6040] border-b border-b-[2px] border-b-[#1f6040] border-r-inset border-b-inset bg-[#00bc77] text-white"

/**
 * Profile page component.
 *
 * Displays the user's profile information, available balance in
 * different accounts, and provides links to view transactions.
 * If the user is not authenticated, it redirects to the home page.
 *
 * @returns {JSX.Element} The Profile page component.
 */
const Profile: React.FC = (): JSX.Element => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, user } = useAppSelector(state => state.auth);


  useEffect(() => {
    /**
     * Fetches the user profile data from the server, if the user is
     * authenticated. If not, it redirects to the home page.
     *
     * The function is called on mount and whenever the user's storage
     * token changes.
     *
     * @returns {Promise<void>} A promise that resolves when the profile
     * data is fetched or the user is redirected.
     */
    const fetchProfileData = async (): Promise<void> => {
      try {
        if (token) {
          await dispatch(fetchProfile()).unwrap();
        } else {
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfileData();
  }, [dispatch, navigate, token]);

  return (
    <main className={`${MAIN} ${BG_DARK}`}>
      <div className={HEADER}>
        <h1 className='sr-only'>Ma page</h1>
        {
          editMode ? (
            <>
              <p className={TITLE}>Welcome back</p>
              <EditProfile setEditMode={setEditMode} />
            </>
          ) : (
            <>
              <p className={TITLE}>Welcome back<br />{`${user?.firstName } ${user?.lastName}` } !</p>
              <button type="button" className={`${EDIT_BUTTON} ${CTA}`} onClick={() => setEditMode(true)}>Edit Name</button>
            </>
          )
        }
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className={ACCOUNT}>
        <div className={ACCOUNT_CONTENT_WRAPPER}>
          <h3 className={ACCOUNT_TITLE}>Argent Bank Checking (x8349)</h3>
          <p className={ACCOUNT_AMOUNT}>$2,082.79</p>
          <p className={ACCOUNT_AMOUNT_DESCRIPTION}>Available Balance</p>
        </div>
        <div className={`${ACCOUNT_CONTENT_WRAPPER} cta`}>
          <button type='button' className={`${TRANSACTION_BUTTON} ${CTA}`}>View transactions</button>
        </div>
      </section>
      <section className={ACCOUNT}>
        <div className={ACCOUNT_CONTENT_WRAPPER}>
          <h3 className={ACCOUNT_TITLE}>Argent Bank Savings (x6712)</h3>
          <p className={ACCOUNT_AMOUNT}>$10,928.42</p>
          <p className={ACCOUNT_AMOUNT_DESCRIPTION}>Available Balance</p>
        </div>
        <div className={`${ACCOUNT_CONTENT_WRAPPER} cta`}>
          <button type='button' className={`${TRANSACTION_BUTTON} ${CTA}`}>View transactions</button>
        </div>
      </section>
      <section className={ACCOUNT}>
        <div className={ACCOUNT_CONTENT_WRAPPER}>
          <h3 className={ACCOUNT_TITLE}>Argent Bank Credit Card (x8349)</h3>
          <p className={ACCOUNT_AMOUNT}>$184.30</p>
          <p className={ACCOUNT_AMOUNT_DESCRIPTION}>Current Balance</p>
        </div>
        <div className={`${ACCOUNT_CONTENT_WRAPPER} cta`}>
          <button type="button" className={`${TRANSACTION_BUTTON} ${CTA}`}>View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default Profile;