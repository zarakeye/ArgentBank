import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fetchProfile } from '../SignIn/authSlice';
// import { User } from '../../services/api.types';

const MAIN =  "flex flex-col flex-1 pb-[2rem]";
const BG_DARK = "bg-[#12002b]"
const HEADER = "text-white mb-[2rem]"
const TITLE =  "text-[32px] py-[21.5px] font-bold"
const EDIT_BUTTON = "border-[#00bc77] bg-[#00bc77] text-white font-bold p-[10px]"
const ACCOUNT = "flex flex-col justify-between items-center border-solid border-[1px] border-black bg-white w-[80%] mx-auto my-0 p-[1.5rem] box-border text-left mb-[2rem]"
const ACCOUNT_MEDIUM = "medium:flex-row"
const ACCOUNT_CONTENT_WRAPPER = "width-full"
const ACCOUNT_CONTENT_WRAPPER_MEDIUM = ""
const ACCOUNT_TITLE = "m-0 p-0 text-[1rem] font-normal"
const ACCOUNT_AMOUNT = "m-0 text-[2.5rem] font-bold"
const ACCOUNT_AMOUNT_DESCRIPTION = "m-0"
const TRANSACTION_BUTTON = "block w-full p-[8px] text-[1.1rem] font-bold mt-[1rem] border-[#00bc77] border-r-solid border-r-[2px] border-r-black border-b-solid border-b-[2px] border-b-black bg-[#00bc77] text-white"
const TRANSACTION_BUTTON_MEDIUM = "medium:w-[200px]"

const User: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        await dispatch(fetchProfile()).unwrap();
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfileData();
  }, [dispatch]);

  const { user } = useAppSelector(state => state.auth);


  return (
    <main className={`${MAIN} ${BG_DARK}`}>
      <div className={HEADER}>
        <h1 className={TITLE}>Welcome back<br />{`${user?.firstName } ${user?.lastName}` } !</h1>
        <button className={EDIT_BUTTON}>Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className={`${ACCOUNT} ${ACCOUNT_MEDIUM}`}>
        <div className={`${ACCOUNT_CONTENT_WRAPPER} ${ACCOUNT_CONTENT_WRAPPER_MEDIUM}`}>
          <h3 className={ACCOUNT_TITLE}>Argent Bank Checking (x8349)</h3>
          <p className={ACCOUNT_AMOUNT}>$2,082.79</p>
          <p className={ACCOUNT_AMOUNT_DESCRIPTION}>Available Balance</p>
        </div>
        <div className={`${ACCOUNT_CONTENT_WRAPPER} cta`}>
          <button className={`${TRANSACTION_BUTTON} ${TRANSACTION_BUTTON_MEDIUM}`}>View transactions</button>
        </div>
      </section>
      <section className={`${ACCOUNT} ${ACCOUNT_MEDIUM}`}>
        <div className={ACCOUNT_CONTENT_WRAPPER}>
          <h3 className={ACCOUNT_TITLE}>Argent Bank Savings (x6712)</h3>
          <p className={ACCOUNT_AMOUNT}>$10,928.42</p>
          <p className={ACCOUNT_AMOUNT_DESCRIPTION}>Available Balance</p>
        </div>
        <div className={`${ACCOUNT_CONTENT_WRAPPER} cta`}>
          <button className={`${TRANSACTION_BUTTON} ${TRANSACTION_BUTTON_MEDIUM}`}>View transactions</button>
        </div>
      </section>
      <section className={`${ACCOUNT} ${ACCOUNT_MEDIUM}`}>
        <div className={ACCOUNT_CONTENT_WRAPPER}>
          <h3 className={ACCOUNT_TITLE}>Argent Bank Credit Card (x8349)</h3>
          <p className={ACCOUNT_AMOUNT}>$184.30</p>
          <p className={ACCOUNT_AMOUNT_DESCRIPTION}>Current Balance</p>
        </div>
        <div className={`${ACCOUNT_CONTENT_WRAPPER} cta`}>
          <button className={`${TRANSACTION_BUTTON} ${TRANSACTION_BUTTON_MEDIUM}`}>View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default User;