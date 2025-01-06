import React from 'react';
import iconChat from '../../assets/icon-chat.svg';
import iconMoney from '../../assets/icon-money.svg';
import iconSecurity from '../../assets/icon-security.svg';
import bankTree from '../../assets/bank-tree.jpeg';

  const HERO = `relative backgroundPosition bg-cover bg-no-repeat h-[300px]`
  const HERO__LARGE = "large:h-[400px] large:backgroundPosition__large"
  const HERO_CONTENT = "absolute top-[2rem] w-[200px] bg-white p-[2rem] mx-auto my-0 text-left"
  const HERO_CONTENT__LARGE = "large:position-absolute large:top-[50px] large:right-[50px] large:w-[300px] large:m-[2rem]"
  const SUBTITLE = "font-bold text-[1rem] m-0"
  const SUBTITLE__LARGE = "large:text-[1.5rem]"
  const TEXT = "text-[.9rem]"
  const TEXT__LARGE = "large:text-[1.2rem]"
  const FEATURES = "flex flex-col"
  const FEATURES__LARGE = "large:flex-row"
  const FEATURE_ITEM = "flex-1 p-[2.5rem]"
  const FEATURE_ICON = "w-[100px] border-solid border-[10px] border-[#00bc77] rounded-full"
  const FEATURE_ITEM_TITLE = "text-[#222] text-[1.25rem] font-bold mb-[.5rem]"

const Home: React.FC = (): JSX.Element => {
  return (
    <main>
      <div className={`${HERO} ${HERO__LARGE}`} style={{backgroundImage: `url(${bankTree})`}}>
        <section className={`${HERO_CONTENT} ${HERO_CONTENT__LARGE}`}>
          <h2 className="sr-only">Promoted Content</h2>
          <p className={`${SUBTITLE} ${SUBTITLE__LARGE}`}>No fees.</p>
          <p className={`${SUBTITLE} ${SUBTITLE__LARGE}`}>No minimum deposit.</p>
          <p className={`${SUBTITLE} ${SUBTITLE__LARGE}`}>High interest rates.</p>
          <p className={`${TEXT} ${TEXT__LARGE}`}>Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className={`${FEATURES} ${FEATURES__LARGE}`}>
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