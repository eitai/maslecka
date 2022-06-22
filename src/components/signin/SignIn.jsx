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
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  createUserDocumentFromAuth,
  googleProvider,
  setLastLogin,
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
  confirmPassword: yup.string().required(),
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
  const handleFormSubmit = (data) => {};
  return (
    <div>
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
      </form>
    </div>
  );
};

export default SignIn;
