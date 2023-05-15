import React, { useState } from 'react';
import Style from './contactUs.module.scss';
import TextField from '@mui/material/TextField';
import Terms from '../../components/terms/Terms';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const inputStyle = {
  width: '100%',
  mb: 3,
  borderRadius: '5px',
};

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fullName, setFullName] = useState('');
  const [isTermsVisible, setIsTermsVisible] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [file, setFile] = useState('');
  const [TZ, setTZ] = useState('');
  const [termsError, setShowTermsError] = useState(false);
  const [showFormError, setShowFormError] = useState(false);

  const sendNewEmail = () => {
    if (isTermsAccepted) {
      if (email && phone && fullName && file) {
        setShowTermsError(true);
        const data = {
          service_id: 'service_ox95csn',
          template_id: 'template_dp8qooa',
          user_id: '5epS-073bMFzUrthm',
          template_params: {
            username: fullName,
            phone: phone,
            file: file,
            email: email,
            tz: TZ,
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
      } else {
        setShowFormError(true);
      }
    } else {
      setShowTermsError(true);
    }
  };

  return (
    <div className='container'>
      <div className={Style.box}>
        <div className={Style.header}>
          <span className={Style.title}> WIN WIN</span>
          <span className={Style.title}> - </span>
          <span className={Style.title}>פיננסי</span>
          <div className={Style.small_title}>
            כל החסכונות והביטוחים המקום אחד
          </div>
          <div className={Style.always_wanted}>
            תמיד רציתם שמקום אחד ירכז לכם את כל נושאי הביטוח והפיננסים שלכם
          </div>
          <div> ( גמל, השתלמות ופנסיה ) </div>
          <div className={Style.possible}> מהיום זה אפשרי!!!</div>
          בכפוף לתקנון
          <span> </span>
          <button
            className={Style.terms}
            onClick={() => setIsTermsVisible(!isTermsVisible)}
          >
            לחץ כאן
          </button>
          {isTermsVisible && (
            <Terms closeModal={() => setIsTermsVisible(false)} />
          )}
        </div>
        <FormControlLabel
          control={<Checkbox />}
          label='בסימון את\ה מאשרים את התקנון'
          onChange={() => setIsTermsAccepted(true)}
          name='checkbox'
          className={Style.delete_checkbox}
        />

        <div className={Style.text}>
          <div className={Style.form_container}>
            <div className={Style.form_box}>
              {' '}
              <TextField
                label='שם מלא'
                type='text'
                className={Style.input}
                size='small'
                sx={inputStyle}
                name='fullname'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <TextField
                label='תעודת זהות'
                type='text'
                className={Style.input}
                size='small'
                sx={inputStyle}
                name='tz'
                value={TZ}
                onChange={(e) => setTZ(e.target.value)}
              />
              <TextField
                label='אימייל'
                type='text'
                className={Style.input}
                size='small'
                sx={inputStyle}
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label='טלפון'
                type='text'
                className={Style.input}
                size='small'
                sx={inputStyle}
                name='phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div>{showFormError && 'נא למלא את כל הפרטים'}</div>
              <div> {termsError && 'נא לאשר את התקנון'}</div>{' '}
            </div>
            <button className={Style.btn} onClick={sendNewEmail}>
              שלח וחסוך עכשיו
            </button>
          </div>
          <div className={Style.img_container}>
            <img
              src={require('../../assets/moneywrite.webp')}
              alt='holdinghands'
              className={Style.img}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
