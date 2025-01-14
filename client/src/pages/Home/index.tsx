import React from 'react';
import iconChat from '../../assets/icon-chat.svg';
import iconMoney from '../../assets/icon-money.svg';
import iconSecurity from '../../assets/icon-security.svg';
import bankTree from '../../assets/bank-tree.jpeg';

const MAIN =  "flex flex-col justify-between flex-1";
const HERO = "relative backgroundPosition bg-cover bg-no-repeat w-full h-[300px] large:h-[550px]";
const HERO_CONTENT = "absolute left-[50%] large:left-auto translate-x-[-50%] large:translate-x-0 top-[2rem] large:top-[50px] large:right-[50px] bg-white p-[2rem] mx-auto my-0 text-left leading-[18px] w-[264px] large:w-[364px] large:m-[2rem]"
const SUBTITLE = "font-bold text-[1rem] large:text-[1.5rem] m-0 large:h-[28px]"
const TEXT = "text-[.9rem] large:text-[1.2rem] mt-[.9rem] large:mt-[1.2rem] large:leading-[22px]"
const FEATURES = "flex flex-col justify-center items-center large:flex-row"
const FEATURE_ITEM = "flex-1 p-[2.5rem] flex flex-col items-center"
const FEATURE_ICON = "w-[100px] border-solid border-[10px] border-[#00bc77] rounded-full"
const FEATURE_ITEM_TITLE = "text-[#222] text-[1.25rem] font-bold mb-[.5rem]"

const Home: React.FC = (): JSX.Element => {
  return (
    <main className={MAIN}>
      <div className={HERO}>
        <img src={bankTree} alt="Bank Tree" className='w-full h-[300px] object-cover object-center large:h-[550px]' />
        <section className={HERO_CONTENT}>
          <h2 className="sr-only">Promoted Content</h2>
          <p className={SUBTITLE}>No fees.</p>
          <p className={SUBTITLE}>No minimum deposit.</p>
          <p className={SUBTITLE}>High interest rates.</p>
          <p className={TEXT}>Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className={FEATURES}>
        <h2 className="sr-only">Features</h2>
        <div className={FEATURE_ITEM}>
          <img src={iconChat} alt="Chat Icon" className={FEATURE_ICON} />
          <h3 className={FEATURE_ITEM_TITLE}>You are our #1 priority</h3>
          <p>
            Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.
          </p>
        </div>
        <div className={FEATURE_ITEM}>
          <img
            src={iconMoney}
            alt="Chat Icon"
            className={FEATURE_ICON}
          />
          <h3 className={FEATURE_ITEM_TITLE}>More savings means higher rates</h3>
          <p>
            The more you save with us, the higher your interest rate will be!
          </p>
        </div>
        <div className={FEATURE_ITEM}>
          <img
            src={iconSecurity}
            alt="Chat Icon"
            className={FEATURE_ICON}
          />
          <h3 className={FEATURE_ITEM_TITLE}>Security you can trust</h3>
          <p>
            We use top of the line encryption to make sure your data and money
            is always safe.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Home;