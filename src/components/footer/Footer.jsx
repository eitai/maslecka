import Style from './footer.module.scss';
import {
  FaFacebook,
  FaFacebookMessenger,
  FaWhatsapp,
  FaEnvelope,
} from 'react-icons/fa';
import ReactWhatsapp from 'react-whatsapp';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className={Style.container}>
      <div className={Style.line}>
        <span className={Style.text}>התחברו אלינו ברשתות החברתיות :</span>
        <div className={Style.icons}>
          <a href='https://www.facebook.com/profile.php?id=100064266904737'>
            <FaFacebook />
          </a>
          <a
            href='https://www.facebook.com/profile.php?id=100064266904737
          '
          >
            <FaFacebookMessenger />
          </a>
          <ReactWhatsapp
            number='972-0509502241'
            message='ברוכים הבאים למסלקה במה נוכל'
          >
            {' '}
            <FaWhatsapp />
          </ReactWhatsapp>

          {/* <button>
            <FaInstagram />
          </button> */}
        </div>
      </div>
      <div className={`${Style.footer_details}`}>
        <div className={Style.texts_container}>
          <img
            src={require('../../assets/logo.webp')}
            alt='logo'
            className={Style.logo}
          />
          <div className={Style.text_container}>
            <span className={Style.title}>מוצרים</span>
            <Link className={Style.btn_small} to='/contact-us'>
              הקצב הדיגיטלי
            </Link>
            <Link className={Style.btn_small} to='/save-now'>
              מכרז חסכון
            </Link>
          </div>

          <div className={`${Style.text_container} ${Style.text_contact}`}>
            <span className={Style.title}>יצירת קשר</span>

            <button className={Style.btn_small}>
              <FaEnvelope className={Style.icon_footer} />
              israel@israeli@gmail.com
            </button>
          </div>
        </div>{' '}
      </div>
      <div className={Style.right_text}>
        כל הזכויות שמורות Ⓒ קצב פיננסי 2022
      </div>
    </div>
  );
};

export default Footer;
