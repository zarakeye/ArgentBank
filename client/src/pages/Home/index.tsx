import React from 'react';
import iconChat from '../../assets/icon-chat.svg';
import iconMoney from '../../assets/icon-money.svg';
import iconSecurity from '../../assets/icon-security.svg';
import bankTree from '../../assets/bank-tree.jpeg';

const style = {
  hero: `position-relative bg-[url(${bankTree})] backgroundPosition bg-cover bg-no-repeat h-[300px]`,
  hero_large: "large:h-[400px] large:backgroundPosition__large",
  heroContent: "position-relative top-[2rem] width-[200px] bg-white p-[2rem] mx-0 my-auto text-left",
  heroContent_large: "large:position-absolute large:top-[50px] large:right-[50px] large:width-[300px] large:m-[2rem]",
  subtitle: "font-bold text-[1rem] m-0",
  subtitle_large: "large:text-[1.5rem]",
  text: "text-[.9rem]",
  text_large: "large:text-[1.2rem]",
  features: "flex flex-col",
  features_large: "large:flex-row",
  featureItem: "flex-1 p-[2.5rem]",
  featureIcon: "w-[100px] border-solid border-[10px] border-[#00bc77]",
  featureItemTitle: "text-[#222] text-[1.25rem] font-bold mb-[.5rem]",
}

const Home: React.FC = (): JSX.Element => {
  return (
    <main>
      <div className={`${style.hero} ${style.hero_large}`}>
        <section className={`${style.heroContent} ${style.heroContent_large}`}>
          <h2 className="sr-only">Promoted Content</h2>
          <p className={`${style.subtitle} ${style.subtitle_large}`}>No fees.</p>
          <p className={`${style.subtitle} ${style.subtitle_large}`}>No minimum deposit.</p>
          <p className={`${style.subtitle} ${style.subtitle_large}`}>High interest rates.</p>
          <p className={`${style.text} ${style.text_large}`}>Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className={`${style.features} ${style.features_large}`}>
        <h2 className="sr-only">Features</h2>
        <div className={style.featureItem}>
          <img src={iconChat} alt="Chat Icon" className={style.featureIcon} />
          <h3 className={style.featureItemTitle}>You are our #1 priority</h3>
          <p>
            Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.
          </p>
        </div>
        <div className={style.featureItem}>
          <img
            src={iconMoney}
            alt="Chat Icon"
            className={style.featureIcon}
          />
          <h3 className={style.featureItemTitle}>More savings means higher rates</h3>
          <p>
            The more you save with us, the higher your interest rate will be!
          </p>
        </div>
        <div className={style.featureItem}>
          <img
            src={iconSecurity}
            alt="Chat Icon"
            className={style.featureIcon}
          />
          <h3 className={style.featureItemTitle}>Security you can trust</h3>
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