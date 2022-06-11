import React from 'react';
import Style from './homePage.module.scss';
import Navbar from '../../components/navbar/Navbar';
import { BsGraphUp } from 'react-icons/bs';
import { SiFampay } from 'react-icons/si';
import { FaCommentDollar, FaPlayCircle } from 'react-icons/fa';
import Footer from '../../components/footer/Footer';
const HomePage = () => {
  return (
    <div>
      <div className={Style.container}>
        <Navbar />
        <div className={Style.text_container}>
          <h1 className={Style.title}>קצב פיננסי</h1>
          <p className={Style.subtitle}>מקצצים בעלויות מכפילים</p>
          <p className={Style.subtitle}>את החסכונות</p>
        </div>

        <div className={Style.btn_container}>
          <button className={Style.btn_test}>
            <FaPlayCircle />
            להדגמה
          </button>
          <button className={Style.btn_reg}>הרשם עכשיו</button>
        </div>
      </div>
      <div className={Style.img_container}>
        <img
          src={require('../../assets/holdinghands.jpg')}
          alt=''
          className={Style.img}
        />
      </div>
      <div className={Style.title_learn_container}>
        <span className={Style.title_learn}>
          למדו <span className={Style.how}> איך:</span>
        </span>
      </div>
      <div className={`container`}>
        <div className={Style.boxes}>
          {/* box 1 */}
          <div className={Style.box}>
            <BsGraphUp className={Style.icon} />
            <h3 className={Style.learn_title}>להתנהל נכון</h3>
            <p className={Style.learn_text}>
              עם הכלים שיש לנו באתר תוכלו להתנהל בצורה נכונה ולצאת מהמינוס
            </p>
          </div>
          {/* box 2 */}
          <div className={Style.box}>
            <SiFampay className={Style.icon} />
            <h3 className={Style.learn_title}>לצאת מהמינוס</h3>
            <p className={Style.learn_text}>
              עם הכלים שיש לנו באתר תוכלו להתנהל בצורה נכונה ולצאת מהמינוס
            </p>
          </div>
          {/* box 3 */}
          <div className={Style.box}>
            <FaCommentDollar className={Style.icon} />
            <h3 className={Style.learn_title}>להתנהל נכון</h3>
            <p className={Style.learn_text}>
              עם הכלים שיש לנו באתר תוכלו להתנהל בצורה נכונה ולצאת מהמינוס
            </p>
          </div>
        </div>
        <div className={Style.services_title_container}>
          <span className={Style.services_subtitle}> ? </span>
          <span className={Style.services_title}> רוצים לחסוך </span>
          <span className={Style.services_subtitle}> כבר עכשיו </span>
        </div>
        <div className={Style.services}>
          <button className={`${Style.service} ${Style.service_1}`}>
            <div className={Style.service_text}>לחצו</div>
            <span className={Style.service_text}> כדי לחסוך בביטוחים</span>
          </button>
          <button className={`${Style.service} ${Style.service_2}`}>
            <div className={Style.service_text}>לחצו</div>
            <span className={Style.service_text}>לייעוץ פנסיוני</span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
