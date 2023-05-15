import React, { useState, useEffect, useRef } from 'react';
import Style from './userPrivateZone.module.scss';
import TextField from '@mui/material/TextField';
import {
  changeFullNameOfUser,
  sendPasswordResetEmail,
  auth,
  deleteUserById,
  signOutUser,
} from '../../firebase';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { login, logout } from '../../store/userSlice';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
const inputStyle = {
  width: '100%',
  mb: 3,
  borderRadius: '5px',
};
const UserPrivateZone = ({ setIsPrivateZoneOpen, isPrivateZoneOpen }) => {
  const [changeType, setChangeType] = useState('fullName');
  const [fullName, setFullName] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isDeleteUser, setIsDeleteUser] = useState('');

  const [isChangePasswordAvailable, setIsChangePasswordAvailable] =
    useState(true);

  const userId = useSelector((state) => state.user.user.uid);
  const userDetails = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleChangeName = () => {
    if (fullName.length > 1) {
      changeFullNameOfUser(userId, fullName);
      dispatch(
        login({
          email: userDetails.email,
          uid: userDetails.uid,
          displayName: fullName,
          phone: null,
        })
      );
    }
    setFullName('');
    setErrorText('עדכון עבר בהצלחה');
    setShowError(true);
  };

  const selectChangeType = (type) => {
    setChangeType(type);
    setShowError(false);
  };
  useEffect(() => {
    if (userDetails.provider === 'google') {
      setIsChangePasswordAvailable(false);
    }
  }, [userDetails.provider]);

  const passwordResetByEmail = () => {
    sendPasswordResetEmail(auth, userDetails.email);
    setErrorText('בדוק את תיבת המייל שלך');
    setShowError(true);
  };

  const deleteUser = () => {
    if (isDeleteUser) {
      deleteUserById(userId);
      setErrorText('המשתמש נמחק');
      setShowError(true);
      setTimeout(() => {
        dispatch(logout());
        signOutUser();
      }, 3000);
    }
  };

  return (
    <div className={Style.container}>
      <button
        className={Style.close_btn}
        onClick={() => setIsPrivateZoneOpen(!isPrivateZoneOpen)}
      >
        X
      </button>
      <div className={Style.title}>האיזור האישי</div>
      <div className={Style.changes_container}>
        <div className={Style.namechange_container}>
          <div className={Style.btn}>
            עדכון שם מלא
            <button
              className={Style.clickhere_btn}
              onClick={() => selectChangeType('fullName')}
            >
              לחץ כאן
            </button>
          </div>
          {isChangePasswordAvailable && (
            <div className={Style.btn}>
              שינוי סיסמא
              <button
                className={Style.clickhere_btn}
                onClick={() => selectChangeType('changePassword')}
              >
                לחץ כאן
              </button>
            </div>
          )}
          <div className={Style.btn}>
            מחיקת משתמש
            <button
              className={Style.clickhere_btn}
              onClick={() => selectChangeType('deleteUser')}
            >
              לחץ כאן
            </button>
          </div>
        </div>
        <div>
          {changeType === 'fullName' && (
            <div>
              <span>שינוי שם מלא</span>
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
              </div>
              <div className={Style.btn_contrainer}>
                <button className={Style.btn_accept} onClick={handleChangeName}>
                  אישור
                </button>
                {showError && (
                  <div className={Style.error_text}>{errorText}</div>
                )}
              </div>
            </div>
          )}
          {changeType === 'changePassword' && (
            <div className={Style.password_change}>
              <span className={Style.password}>
                {' '}
                החלפת סיסמא באמצעות אימייל
              </span>
              <div className={Style.btn_contrainer}>
                <button
                  className={`${Style.btn_accept} ${Style.btn_pass}`}
                  onClick={passwordResetByEmail}
                >
                  שלח
                </button>
                {showError && (
                  <div className={Style.error_text}>{errorText}</div>
                )}
              </div>
            </div>
          )}
          {changeType === 'deleteUser' && (
            <div className={Style.delete_container}>
              <span>מחיקת משתמש</span>
              <FormControlLabel
                control={<Checkbox />}
                label='האם אתה בטוח למחוק את המשתמש?'
                onChange={() => setIsDeleteUser(true)}
                name='checkbox'
                className={Style.delete_checkbox}
              />
              <div className={Style.btn_contrainer}>
                <button
                  className={`${Style.btn_accept} ${Style.btn_pass}`}
                  onClick={deleteUser}
                >
                  מחק משתמש
                </button>
                {showError && (
                  <div className={Style.error_text}>{errorText}</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPrivateZone;
