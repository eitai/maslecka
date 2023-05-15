import React, { useState, useEffect } from 'react';
import Style from './addPhoneModal.module.scss';
import { addPhonOfUser } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';

const AddPhoneModal = ({ setShowAddPhoneModal }) => {
  const userId = useSelector((state) => state.user.user.uid);
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [phone, setPhone] = useState();
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleAddPhone = () => {
    if (phone.length > 8) {
      addPhonOfUser(userId, phone);
      sendNewEmail();
      setPhone('');
      setShowSuccessMsg(true);
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
        setShowAddPhoneModal(false);
      }, 3000);
    } else {
      setShowError(true);
    }
  };

  const sendNewEmail = () => {
    const data = {
      service_id: 'service_ox95csn',
      template_id: 'template_dp8qooa',
      user_id: '5epS-073bMFzUrthm',
      template_params: {
        phone: phone,
        username: user.displayName,
        email: user.email,
      },
    };
    fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    }).then(
      (result) => {},
      (error) => {}
    );
  };
  return (
    <div className={Style.container}>
      <button
        className={Style.closemodalbtn}
        onClick={() => setShowAddPhoneModal(false)}
      >
        X
      </button>
      <span className={Style.title}>
        כדי להשלים את תאריך ההרשמה עלייכם להזין מספר טלפון
      </span>

      <div className={Style.addphone_btn_container}>
        <span className={Style.label}>הזינו מספר טלפון</span>
        <input
          type='text'
          className={Style.phone_input}
          onChange={(e) => setPhone(e.target.value)}
        />{' '}
        <button className={Style.addphone_btn} onClick={handleAddPhone}>
          הוספה
        </button>
        {showSuccessMsg && <span>הטלפון נוסף בהצלחה את\ה מועברים למערכת</span>}
        {showError && <span>טלפון לא תקין</span>}
      </div>
    </div>
  );
};

export default AddPhoneModal;
