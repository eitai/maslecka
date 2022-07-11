import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Style from './signin.module.scss';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import { setActiveUser, login } from '../../store/userSlice';
import {
  auth,
  updateProfile,
  createUserDocumentFromAuth,
  googleProvider,
  setLastLogin,
  signInUserWithEmailAndPassword,
} from '../../firebase';

const inputStyle = {
  width: '100%',
  mb: 3,
};

const validationSchema = yup.object().shape({
  email: yup.string().email('נא להכניס אימייל').required(),
  password: yup
    .string()
    .min(4, 'נא להכניס סיסמא של 4-20 תווים')
    .max(20)
    .required(),
});

const SignIn = ({ closeForm, setIsSignIn, open }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const handleSignInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).then((result) => {
      const user = result.user.multiFactor.user;

      createUserDocumentFromAuth(user);
      setLastLogin(user);
      dispatch(
        setActiveUser({
          userEmail: user.email,
          uid: user.uid,
          userName: user.displayName,
        })
      );
      closeForm();
    });
  };
  const handleFormSubmit = (data) => {
    signInUserWithEmailAndPassword(email, password).then((result) => {
      setLastLogin(result.user);
      dispatch(
        login({
          email: result.user.email,
          uid: result.user.uid,
          displayName: result.user.displayName,
        })
      );
      closeForm();
    });
  };
  return (
    <div className={Style.container}>
      <div className={Style.btn_container}>
        <button className={Style.btn_google} onClick={handleSignInWithGoogle}>
          הרשם עם גוגל
          <FaGoogle className={Style.icon} />
        </button>
        {/* <button className={Style.btn_facebook}>
          הרשם עם פייסבוק
          <FaFacebook className={Style.icon} />
        </button> */}
      </div>
      <img
        src={require('../../../src/assets/businessman_PNG6572.webp')}
        alt=''
        className={Style.img_happy}
      />
      <form className={Style.form} onSubmit={handleSubmit(handleFormSubmit)}>
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
          error={errors.password}
          label='סיסמה'
          helperText={errors.password ? errors.password.message : ''}
          {...register('password')}
          className={Style.input}
          size='small'
          sx={inputStyle}
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type='submit' value='התחבר' className={Style.btn_signIn} />
      </form>
      <div className={Style.signin_container}>
        <span className={Style.text}>עוד לא רשום במערכת? </span>
        <button className={Style.signin_btn} onClick={() => setIsSignIn(false)}>
          הרשם
        </button>
      </div>
    </div>
  );
};

export default SignIn;
