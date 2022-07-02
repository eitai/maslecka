import React, { useState, useEffect } from 'react';
import Style from './contactUs.module.scss';
import Navbar from '../../components/navbar/Navbar';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { GiSplitArrows } from 'react-icons/gi';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object().shape({
  fullname: yup.string('נא להכניס שם מלא').required('נא להכניס שם מלא'),
  email: yup.string().email('נא להכניס אימייל').required('יש למלא אימייל'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'יש להכניס טלפון')
    .required('יש למלא טלפון'),
});

const inputStyle = {
  width: '100%',
  mb: 3,
};

const sgEmail = require('@sendgrid/mail').config(process.env.SMTP_KEY);
sgEmail.setApiKey(
  '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'
);
const ContactUs = () => {
  const [mainImg, setMainImg] = useState(1);
  const [subject, setSubject] = useState('כללי');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [textArea, setTextArea] = useState('');

  const [name, setName] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const handleSubject = (imgNum, subject) => {
    setMainImg(imgNum);
    setSubject(subject);
  };

  const handleFormSubmit = () => {
    debugger;
  };

  return (
    <div>
      <Navbar isBackgroundColorOn={true} />
      <div className={Style.main_container}>
        <div className={Style.title_container}>
          <h2 className={Style.title}>
            השאירו פרטים ואנחנו נדאג
            <span> </span>
            <span className={Style.title_part}>שתתחילו לחסוך:</span>
          </h2>
        </div>
        <div className={`container ${Style.container}`}>
          <div className={Style.form_container}>
            <form
              className={Style.form}
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <TextField
                error={errors?.fullname}
                id='fullWidth'
                label='שם מלא'
                helperText={errors.fullname ? errors.fullname.message : ''}
                {...register('fullname')}
                className={Style.input}
                size='small'
                sx={inputStyle}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                error={errors?.email}
                label='אימייל'
                helperText={errors.email ? errors.email.message : ''}
                {...register('email')}
                className={Style.input}
                size='small'
                sx={inputStyle}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                error={errors.phone}
                label='טלפון'
                type='text'
                className={Style.input}
                helperText={errors.phone ? errors.phone.message : ''}
                size='small'
                sx={inputStyle}
                {...register('phone')}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextareaAutosize
                maxRows={4}
                aria-label='maximum height'
                placeholder='שתפו אותנו'
                style={{
                  width: '25rem',
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  height: 70,
                  display: 'block',
                  marginBottom: '15px',
                  color: 'rgba(0, 0, 0, 0.6)',
                  paddingRight: '10px',
                }}
                onChange={(e) => setTextArea(e.target.value)}
              />
              <input type='submit' value='שלח' className={Style.btn_signup} />
            </form>
            <div className={Style.img_container}>
              <span className={Style.img_title}> בחרתם ב - </span>
              <span className={Style.img_subtitle}> {subject}</span>
              <img
                src={require(`../../assets/contactus${mainImg}.jpg`)}
                alt='logo'
                className={Style.img}
              />
            </div>
          </div>
          <div className={Style.subtitle}>
            <span>בחרו נושא פנייה</span>
            <div className={Style.icon}>
              <GiSplitArrows />
            </div>
          </div>
          <div className={Style.choice_section}>
            <div className={Style.line}></div>

            <button
              className={Style.box}
              onClick={() => handleSubject(1, 'ביטוח')}
            >
              <span className={Style.box_text}>ביטוח</span>
              <img
                src={require('../../assets/contactus1.jpg')}
                alt='logo'
                className={Style.img}
              />
            </button>
            <button
              className={Style.box}
              onClick={() => handleSubject(2, 'ביטוח')}
            >
              <span className={Style.box_text}>ביטוח</span>
              <img
                src={require('../../assets/contactus2.jpg')}
                alt='logo'
                className={Style.img}
              />
            </button>
            <button
              className={Style.box}
              onClick={() => handleSubject(3, 'חיסכון')}
            >
              <span className={Style.box_text}>חיסכון</span>
              <img
                src={require('../../assets/contactus3.jpg')}
                alt='logo'
                className={Style.img}
              />
            </button>
            <button
              className={Style.box}
              onClick={() => handleSubject(4, 'פנסיה')}
            >
              <span className={Style.box_text}>פנסיה</span>
              <img
                src={require('../../assets/contactus4.jpg')}
                alt='logo'
                className={Style.img}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
