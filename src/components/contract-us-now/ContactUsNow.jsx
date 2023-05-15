import React, { useState, useEffect } from 'react';
import Style from './contactUsNow.module.scss';
import TextField from '@mui/material/TextField';

const inputStyle = {
  width: '100%',
  mb: 3,
  borderRadius: '5px',
};

const ContactUsNow = ({ isContactUsOpen, setIsContactUsOpen }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const sendNewEmail = () => {
    const data = {
      service_id: 'service_ox95csn',
      template_id: 'template_dp8qooa',
      user_id: '5epS-073bMFzUrthm',
      template_params: {
        username: fullName,
        phone: phone,
        email: email,
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
    setShowMessage(true);
    setEmail('');
    setPhone('');
    setFullName('');
    setTimeout(() => {
      setShowMessage(false);
      setIsContactUsOpen(false);
    }, 2000);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <div>
        <div
          className={`${Style.form_container} ${
            isContactUsOpen && Style.visible
          }`}
        >
          <button
            className={Style.closebtn_mobile}
            onClick={() => setIsContactUsOpen(!isContactUsOpen)}
          >
            X
          </button>
          <div className={Style.form_title}>צור קשר</div>
          <div className={Style.box}>
            <TextField
              label='שם מלא'
              type='text'
              className={Style.input}
              size='small'
              sx={inputStyle}
              name='fullName'
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
            <TextField
              label='אימייל'
              type='text'
              className={Style.input}
              size='small'
              sx={inputStyle}
              name='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <TextField
              label='טלפון'
              type='text'
              className={Style.input}
              size='small'
              sx={inputStyle}
              name='phone'
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
            <button className={Style.send_btn} onClick={sendNewEmail}>
              שלח
            </button>
            {showMessage && <div>הודעה נשלחה בהצלחה</div>}{' '}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUsNow;
