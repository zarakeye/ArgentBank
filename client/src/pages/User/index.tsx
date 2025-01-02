import React from 'react';

const style = {
  main: "flex-1 ",
  bgDark: "bg-[#12002b]",
  header: "text-white mb-[2rem]",
  editButton: "border-[#00bc77] bg-[#00bc77] text-white font-bold p-[10px]",
  account: "flex flex-col justify-between items-center border-solid border-[1px] border-black bg-white w-[80%] mx-0 my-auto p-[2rem] p-[1.5rem] box-border text-left mb-[2rem]",
  account_medium: "medium:flex-row",
  accountContentWrapper: "width-full flex-1",
  accountContentWrapper_medium: "medium:flex-0",
  accountTitle: "m-0 p-0 text-[1rem] font-normal",
  accountAmount: "m-0 text-[2.5rem] font-bold",
  accountAmountDescription: "m-0",
  transactionButton: "block w-full p-[8px] text-[1.1rem] font-bold mt-[1rem] border-[#00bc77] bg-[#00bc77] text-white",
  transactionButton_medium: "medium:w-[200px]",
}

const User: React.FC = (): JSX.Element => {
  return (
    <main className={`${style.main} ${style.bgDark}`}>
      <div className={style.header}>
        <h1>Welcome back<br />Tony Jarvis!</h1>
        <button className={style.editButton}>Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className={`${style.account} ${style.account_medium}`}>
        <div className={`${style.accountContentWrapper} ${style.accountContentWrapper_medium}`}>
          <h3 className={style.accountTitle}>Argent Bank Checking (x8349)</h3>
          <p className={style.accountAmount}>$2,082.79</p>
          <p className={style.accountAmountDescription}>Available Balance</p>
        </div>
        <div className={`${style.accountContentWrapper} cta`}>
          <button className={style.accountAmountDescription}>View transactions</button>
        </div>
      </section>
      <section className={style.account}>
        <div className={style.accountContentWrapper}>
          <h3 className={style.accountTitle}>Argent Bank Savings (x6712)</h3>
          <p className={style.accountAmount}>$10,928.42</p>
          <p className={style.accountAmountDescription}>Available Balance</p>
        </div>
        <div className={`${style.accountContentWrapper} cta`}>
          <button className={style.accountAmountDescription}>View transactions</button>
        </div>
      </section>
      <section className={style.account}>
        <div className={style.accountContentWrapper}>
          <h3 className={style.accountTitle}>Argent Bank Credit Card (x8349)</h3>
          <p className={style.accountAmount}>$184.30</p>
          <p className={style.accountAmountDescription}>Current Balance</p>
        </div>
        <div className={`${style.accountContentWrapper} cta`}>
          <button className={`${style.transactionButton} ${style.transactionButton_medium}`}>View transactions</button>
        </div>
      </section>
    </main>
  );
};

export default User;