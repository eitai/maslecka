import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';

import Style from './adPopup.module.scss';
import { GrFormClose } from 'react-icons/gr';

const AdPopup = ({ setIsAdPopupOpen }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [textArea, setTextArea] = useState('');
  const [fullName, setFullName] = useState('');

  const inputStyle = {
    width: '100%',
    mb: 3,
    borderRadius: '5px',
  };

  const sendNewEmail = () => {
    const subject = [
      'כבלים',
      'אינטרנט',
      'פלאפון',
      'ביטוח',
      'פיננסים',
      'משכנתאות',
      'גז',
    ];
    const data = {
      service_id: 'service_ox95csn',
      template_id: 'template_dp8qooa',
      user_id: '5epS-073bMFzUrthm',
      template_params: {
        username: fullName,
        phone: phone,
        textArea: textArea,
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

    setEmail('');
    setPhone('');
    setTextArea('');
    setFullName('');
  };
  const closeModal = (e) => {
    setIsAdPopupOpen(false);
  };
  return (
    <div className={Style.container} onClick={closeModal}>
      <div className={Style.small_container}>
        <GrFormClose
          className={Style.closeIcon}
          onClick={() => setIsAdPopupOpen(false)}
        />
        <img
          src={require('../../../src/assets/keyHome.webp')}
          alt=''
          className={Style.img_happy}
        />
        <div className={Style.text_container}>
          <div className={Style.text_title}>
            <h3>רוצה לחסוך כבר עכשיו?</h3>
            <span>השאירו פרטים:</span>
          </div>
          <div>
            <TextField
              label='שם מלא'
              type='text'
              className={Style.input}
              size='small'
              sx={inputStyle}
              name='fullname'
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />
            <TextField
              label='אימייל'
              type='email'
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
            <div className={Style.testArea_container}>
              <TextareaAutosize
                maxRows={4}
                aria-label='maximum height'
                placeholder='שתפו אותנו'
                name='textArea'
                sx={inputStyle}
                style={{
                  width: '100%',
                  border: '2px solid rgba(0, 0, 0, 0.1)',
                  height: 70,
                  display: 'block',
                  marginBottom: '15px',
                  color: 'black',
                  paddingRight: '10px',
                  borderRadius: '10px',
                }}
                onChange={(e) => setTextArea(e.target.value)}
                value={textArea}
              />
            </div>{' '}
            <button className={Style.btn} onClick={sendNewEmail}>
              שלח עכשיו
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdPopup;
