import React, { useState, useEffect, useRef } from 'react';
import Style from './contactUs.module.scss';
import Navbar from '../../components/navbar/Navbar';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { GiSplitArrows } from 'react-icons/gi';
import emailjs from 'emailjs-com';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object().shape({
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

const ContactUs = () => {
  const [mainImg, setMainImg] = useState(1);
  const [subject, setSubject] = useState('כללי');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [textArea, setTextArea] = useState('');
  const [fullName, setFullName] = useState('');

  const form = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const handleSubject = (imgNum, subject) => {
    setMainImg(imgNum);
    setSubject(subject);
  };

  const sendEmail = (details) => {
    emailjs
      .sendForm(
        'service_ox95csn',
        'template_dp8qooa',
        form.current,
        '5epS-073bMFzUrthm'
      )
      .then(
        (result) => {
          // console.log(result.text);
        },
        (error) => {
          // console.log(error.text);
        }
      );
  };

  const handleFormSubmit = (e) => {
    const userMessage = {
      fullName: e.fullname,
      email: e.email,
      phone: e.phone,
      textArea: textArea,
      subject: subject,
    };
    debugger;
    sendEmail(userMessage);
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
              ref={form}
              className={Style.form}
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <TextField
                error={errors?.fullname}
                label='שם מלא'
                type='text'
                helperText={errors.fullname ? errors.fullname.message : ''}
                {...register('fullname')}
                className={Style.input}
                size='small'
                sx={inputStyle}
                name='fullname'
                onChange={(e) => setFullName(e.target.value)}
                value={fullName}
              />
              <TextField
                error={errors?.email}
                label='אימייל'
                type='email'
                helperText={errors.email ? errors.email.message : ''}
                {...register('email')}
                className={Style.input}
                size='small'
                sx={inputStyle}
                name='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <TextField
                error={errors.phone}
                label='טלפון'
                type='text'
                className={Style.input}
                helperText={errors.phone ? errors.phone.message : ''}
                size='small'
                sx={inputStyle}
                name='phone'
                {...register('phone')}
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
              <TextareaAutosize
                maxRows={4}
                aria-label='maximum height'
                placeholder='שתפו אותנו'
                name='textArea'
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
                value={textArea}
              />
              <input type='submit' value='שלח' className={Style.btn_signup} />
            </form>
            <div className={Style.img_container}>
              <span className={Style.img_title}> בחרתם ב - </span>
              <span className={Style.img_subtitle}> {subject}</span>
              <img
                src={require(`../../assets/contactus${mainImg}.webp`)}
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
                src={require('../../assets/contactus1.webp')}
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
                src={require('../../assets/contactus2.webp')}
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
                src={require('../../assets/contactus3.webp')}
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
                src={require('../../assets/contactus4.webp')}
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
