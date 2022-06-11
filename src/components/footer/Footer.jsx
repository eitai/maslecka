import React from 'react';
import Style from './footer.module.scss';
import {
  FaFacebook,
  FaFacebookMessenger,
  FaWhatsapp,
  FaInstagram,
  FaHome,
  FaEnvelope,
  FaPhoneAlt,
  FaFax,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className={Style.container}>
      <div className={Style.line}>
        <span className={Style.text}>התחבר אלינו ברשתות החברתיות :</span>
        <div className={Style.icons}>
          <FaFacebook />
          <FaFacebookMessenger />
          <FaWhatsapp />
          <FaInstagram />
        </div>
      </div>
      <div className={Style.footer_details}>
        <img
          src={require('../../assets/logo.png')}
          alt='logo'
          className={Style.logo}
        />
        <div className={Style.texts_container}>
          <div className={Style.text_container}>
            <span className={Style.title}>מוצרים</span>
            <button className={Style.btn_small}>חסכונות</button>
            <button className={Style.btn_small}>ייעוץ פנסיוני</button>
            <button className={Style.btn_small}>עזרה</button>
          </div>
          <div className={Style.text_container}>
            <span className={Style.title}>קישורים נוספים</span>
            <button className={Style.btn_small}>חסכונות</button>
            <button className={Style.btn_small}>ייעוץ פנסיוני</button>
            <button className={Style.btn_small}>עזרה</button>
          </div>
          <div className={`${Style.text_container} ${Style.text_contact}`}>
            <span className={Style.title}>יצירת קשר</span>
            <button className={Style.btn_small}>
              <FaHome className={Style.icon_footer} /> נביאים 7 טבריה
            </button>
            <button className={Style.btn_small}>
              <FaEnvelope className={Style.icon_footer} />
              israel@israeli@gmail.com
            </button>
            <button className={Style.btn_small}>
              <FaPhoneAlt className={Style.icon_footer} />
              0549308299
            </button>
            <button className={`${Style.btn_small} `}>
              <FaFax className={Style.icon_footer} />
              0549308299
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
