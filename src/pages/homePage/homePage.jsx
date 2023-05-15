import React, { useState, useEffect } from 'react';
import Style from './homePage.module.scss';
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
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AddPhoneModal from '../../components/addPhoneModal/AddPhoneModal';

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
  const [showAddPhoneModal, setShowAddPhoneModal] = useState(false);
  const userPhoneExist = useSelector((state) => state.user.user.phone);

  const handleAuthForm = (e, isSignin, authType) => {
    e.preventDefault();
    setIsSignIn(isSignin);
    setOpenForm(!openForm);
  };
  const handleMoveToDashboard = () => {
    if (!userPhoneExist) {
      setShowAddPhoneModal(true);
    } else {
      navigate('/dashboard', { replace: true });
    }
  };
  useEffect(() => {
    if (openForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [openForm]);

  const handleCloseForm = (e) => {
    setOpenForm(false);
  };
  const navigate = useNavigate();

  const handleMoveToDemo = () => {
    navigate('/demo-page', { replace: true });
  };

  const GuestBtn = () => {
    return (
      <div className={Style.btn_container}>
        <button
          className={Style.btn_reg}
          onClick={(e) => handleAuthForm(e, false, 'sign-up')}
        >
          הרשם עכשיו
        </button>
        <button className={Style.btn_test} onClick={handleMoveToDemo}>
          להדגמה
          <FaPlayCircle />
        </button>
      </div>
    );
  };

  const AfterLoggedInBtn = () => {
    return (
      <div
        className={` ${Style.btn_maslecka_container} ${Style.btn_container}`}
      >
        <button
          className={Style.btn_tomaslecka}
          onClick={handleMoveToDashboard}
        >
          כניסה למערכת{' '}
        </button>
      </div>
    );
  };

  return (
    <>
      <div>
        <div className={Style.container}>
          <div className={Style.text_container}>
            <h1 className={Style.title}>קצב פיננסי</h1>
            <span className={Style.small_subtitle}>ההיטק של כלכלת המשפחה</span>
            <p className={Style.subtitle}> מקצץ בעלויות ומכפיל את החסכונות</p>
          </div>

          {!isLoggedIn ? <GuestBtn /> : <AfterLoggedInBtn />}
        </div>
        <div className={Style.img_container}>
          <img
            src={require('../../assets/demos.webp')}
            alt='holdinghands'
            className={Style.img}
          />
          <img
            src={require('../../assets/shakhandman.png')}
            alt='holdinghands'
            className={Style.img_shakehand}
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
              <h3 className={Style.learn_title}> להתנהל חכם כלכלית</h3>
              {/* <p className={Style.learn_text}>
                עם הכלים שיש לנו באתר תוכלו להתנהל בצורה נכונה ולצאת מהמינוס
              </p> */}
            </div>
            {/* box 2 */}
            <div className={Style.box}>
              <SiFampay className={Style.icon} />
              <h3 className={Style.learn_title}>לצאת ממינוס לפלוס</h3>
              {/* <p className={Style.learn_text}>
                עם הכלים שיש לנו באתר תוכלו להתנהל בצורה נכונה ולצאת מהמינוס
              </p> */}
            </div>
            {/* box 3 */}
            <div className={Style.box}>
              <FaCommentDollar className={Style.icon} />
              <h3 className={Style.learn_title}>
                {' '}
                להתנהל נכון בביטוח ופיננסים
              </h3>
              {/* <p className={Style.learn_text}>
                עם הכלים שיש לנו באתר תוכלו להתנהל בצורה נכונה ולצאת מהמינוס
              </p> */}
            </div>
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
              <SignUp closeForm={handleCloseForm} setIsSignIn={setIsSignIn} />
            )}
            {openForm && isSignedIn && (
              <SignIn setIsSignIn={setIsSignIn} closeForm={handleCloseForm} />
            )}
          </Box>
        </Fade>
      </Modal>
      {showAddPhoneModal && (
        <AddPhoneModal setShowAddPhoneModal={setShowAddPhoneModal} />
      )}
    </>
  );
};

export default HomePage;
