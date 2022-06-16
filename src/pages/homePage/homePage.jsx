import React, { useState, useEffect } from 'react';
import Style from './homePage.module.scss';
import Navbar from '../../components/navbar/Navbar';
import { BsGraphUp } from 'react-icons/bs';
import { SiFampay } from 'react-icons/si';
import { FaCommentDollar, FaPlayCircle } from 'react-icons/fa';
import Footer from '../../components/footer/Footer';
import SignUp from '../../components/signup/SignUp';
import SignIn from '../../components/signin/SignIn';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { useSelector, useDispatch } from 'react-redux';

const boxStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const HomePage = () => {
  const [openForm, setOpenForm] = useState(false);
  const [isSignedIn, setIsSignIn] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleSignupForm = (e, test) => {
    e.preventDefault();
    setOpenForm(!openForm);
    setIsSignIn(false);

    if (test && test === 'sign-in') {
      setIsSignIn(!isSignedIn);
    }
  };
  console.log(openForm);

  useEffect(() => {
    if (openForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [openForm]);

  const handleCloseForm = (e) => {
    e.preventDefault();
    setOpenForm(false);
  };

  const GuestBtn = () => {
    return (
      <div className={Style.btn_container}>
        <button className={Style.btn_reg} onClick={handleSignupForm}>
          הרשם עכשיו
        </button>
        <button className={Style.btn_test}>
          להדגמה
          <FaPlayCircle />
        </button>
      </div>
    );
  };

  const AfterLoggedInBtn = () => {
    return <div className={Style.btn_container}></div>;
  };
  return (
    <>
      <div>
        <div className={Style.container}>
          <Navbar handleSignup={handleSignupForm} />
          <div className={Style.text_container}>
            <h1 className={Style.title}>קצב פיננסי</h1>
            <p className={Style.subtitle}>מקצצים בעלויות מכפילים</p>
            <p className={Style.subtitle}>את החסכונות</p>
          </div>

          {!isLoggedIn ? <GuestBtn /> : <AfterLoggedInBtn />}
        </div>
        <div className={Style.img_container}>
          <img
            src={require('../../assets/holdinghands.jpg')}
            alt='holdinghands'
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

      <Modal
        open={openForm}
        onClose={() => setOpenForm(false)}
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 700,
        }}
        onBackdropClick={() => setOpenForm(false)}
      >
        <Fade in={openForm}>
          <Box className={Style.signup_box}>
            {openForm && !isSignedIn && (
              <SignUp open={openForm} closeForm={handleCloseForm} />
            )}
            {openForm && isSignedIn && <SignIn open={openForm} />}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default HomePage;
