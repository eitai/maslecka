import React, { useState, useEffect } from 'react';
import Style from './contactUs.module.scss';
import Navbar from '../../components/navbar/Navbar';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';

const validationSchema = yup.object().shape({
  email: yup.string().email('נא להכניס אימייל').required(),
  password: yup
    .string()
    .min(4, 'נא להכניס סיסמא של 4-20 תווים')
    .max(20)
    .required(),
  confirmPassword: yup.string().required(),
});

const inputStyle = {
  width: '100%',
  mb: 3,
};

const inputStyleTextArea = {
  width: '100%',
  height: '20rem',
  mb: 3,
};

const ContactUs = () => {
  const [mainImg, setMainImg] = useState(1);
  const [email, setEmail] = useState('');
  const [isError, setIsError] = useState(false);
  const [currentError, setCurrentError] = useState('');
  const [name, setName] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

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
              // onSubmit={handleSubmit(handleFormSubmit)}
            >
              <TextField
                error={errors?.name}
                id='fullWidth'
                label='שם מלא'
                helperText={errors?.name}
                דפ
                {...register('name')}
                className={Style.input}
                size='small'
                sx={inputStyle}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                error={errors?.lastname}
                label='אימייל'
                helperText={errors?.name}
                {...register('email')}
                className={Style.input}
                size='small'
                sx={inputStyle}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                error={errors.confirmPassword}
                label='טלפון'
                type='text'
                className={Style.input}
                size='small'
                sx={inputStyle}
                // onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <TextareaAutosize
                maxRows={4}
                aria-label='maximum height'
                placeholder='שתפו אותנו'
                style={{
                  width: '25rem',
                  border: '1px solid rgba(0, 0, 0, 0.23)',
                  height: 150,
                  display: 'block',
                  marginBottom: '15px',
                  color: 'rgba(0, 0, 0, 0.6)',
                  paddingRight: '10px',
                }}
              />
              <input type='submit' value='שלח' className={Style.btn_signup} />
              {isError && (
                <div className={Style.error_password}>{currentError}</div>
              )}
            </form>

            <div className={Style.img_container}>
              <img
                src={require(`../../assets/contactus${mainImg}.jpg`)}
                alt='logo'
                className={Style.img}
              />
            </div>
          </div>
          <div className={Style.choice_section}>
            <div className={Style.line}></div>
            <div className={Style.box}>
              <img
                src={require('../../assets/contactus2.jpg')}
                alt='logo'
                className={Style.img}
              />
            </div>
            <div className={Style.box}>
              {' '}
              <img
                src={require('../../assets/contactus2.jpg')}
                alt='logo'
                className={Style.img}
              />
            </div>
            <div className={Style.box}>
              {' '}
              <img
                src={require('../../assets/contactus3.jpg')}
                alt='logo'
                className={Style.img}
              />
            </div>
            <div className={Style.box}>
              {' '}
              <img
                src={require('../../assets/contactus4.jpg')}
                alt='logo'
                className={Style.img}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
