import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Style from './signup.module.scss';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

import {
  setActiveUser,
  setUserLogOutState,
  selectUserEmail,
  selectUserName,
  login,
} from '../../store/userSlice';
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  googleProvider,
  createUserDocumentFromAuth,
  setLastLogin,
} from '../../firebase';

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
const SignUp = ({ open, closeForm }) => {
  const dispatch = useDispatch();
  const test = useSelector((state) => state.user);
  console.log(test, 'select');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [name, setName] = useState('');

  const handleFormSubmit = (data) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        createUserDocumentFromAuth(userAuth.user);
        setLastLogin(userAuth.user);
        console.log(userAuth, 'XXXXXXX');

        updateProfile(userAuth.user, {
          displayName: lastName,
        })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: name + ' ' + lastName,
              })
            );

            // setOpen(false);
            // setTimeout(() => {
            //   navigate('loggedin/dashboard', { replace: true });
            // }, 1000);
          })
          .catch((error) => {
            console.log('user not updated');
          });
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleSignInWithGoogle = () => {
    auth.signInWithPopup(googleProvider).then((result) => {
      const user = result.user.multiFactor.user;
      createUserDocumentFromAuth(user);
      setLastLogin(user);
      console.log(user.user);
      dispatch(
        setActiveUser({
          userEmail: user.email,
          uid: user.uid,
          userName: user.displayName,
        })
      );
      closeForm();
      // setOpen(false);
      // setTimeout(() => {
      //   navigate('loggedin/dashboard', { replace: true });
      // }, 1000);
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
      <form className={Style.form} onSubmit={handleSubmit(handleFormSubmit)}>
        <TextField
          error={errors?.name}
          id='fullWidth'
          label='שם מלא'
          helperText={errors?.name}
          {...register('name')}
          className={Style.input}
          size='small'
          sx={inputStyle}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          error={errors?.lastname}
          id='outlined-error-helper-text'
          label='אימייל'
          helperText={errors?.name}
          {...register('email')}
          className={Style.input}
          size='small'
          sx={inputStyle}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          error={errors.password}
          id='outlined-error-helper-text'
          label='סיסמה'
          helperText={errors.password ? errors.password.message : ''}
          {...register('password')}
          className={Style.input}
          size='small'
          sx={inputStyle}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          error={errors.confirmPassword}
          id='outlined-error-helper-text'
          label='אימות סיסמא'
          helperText={
            errors.confirmPassword ? errors.confirmPassword.message : ''
          }
          {...register('confirmPassword')}
          className={Style.input}
          size='small'
          sx={inputStyle}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input type='submit' value='הרשם עכשיו' className={Style.btn_signup} />
      </form>
      <div className={Style.signin_container}>
        <span className={Style.text}>כבר רשום במערכת?</span>
        <button className={Style.signin_btn}>התחבר</button>
      </div>
    </div>
  );
};

export default SignUp;
