import React, { useState, useEffect, useRef } from 'react';
import Style from './saveNow.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

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
  borderRadius: '5px',
};

const SaveNow = () => {
  const [subjects, setSubjects] = useState([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [textArea, setTextArea] = useState('');
  const [fullName, setFullName] = useState('');

  const form = useRef();
  const form2 = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const sendNewEmail = () => {
    const subjectsToString = subjects.join(', ');

    const data = {
      service_id: 'service_ox95csn',
      template_id: 'template_dp8qooa',
      user_id: '5epS-073bMFzUrthm',
      template_params: {
        username: fullName,
        phone: phone,
        textArea: textArea,
        subjects: subjectsToString,
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
  };

  const handleFormSubmit = (e) => {
    const subjectsToString = subjects.join(', ');

    const userMessage = {
      fullname: e.fullname,
      email: e.email,
      phone: e.phone,
      textArea: textArea,
      subjects: subjectsToString,
    };
    sendNewEmail(userMessage);
  };

  const handleChosenSubjects = (subject) => {
    const subjectExist = subjects.includes(subject);
    if (!subjectExist) {
      setSubjects((prev) => [...prev, subject]);
    } else {
      const subjectIndex = subjects.indexOf(subject);
      const newSubjects = subjects;
      newSubjects.splice(subjectIndex, 1);
      setSubjects([...newSubjects]);
    }
  };
  return (
    <div>
      <div className={Style.main_container}>
        <div className={`container ${Style.container}`}>
          <form
            ref={form}
            className={`savenow-mui-override ${Style.form}`}
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div className={Style.title_container}>
              <h2 className={Style.title}>
                השיארו פרטים <span> </span>
                <span className={Style.title_part}>ותתחילו לחסוך:</span>
              </h2>
            </div>
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
            <div className={Style.testArea_container}>
              <TextareaAutosize
                maxRows={4}
                aria-label='maximum height'
                placeholder='שתפו אותנו'
                name='textArea'
                sx={inputStyle}
                style={{
                  width: '100%',
                  border: '2px solid #444295',
                  height: 70,
                  display: 'block',
                  marginBottom: '15px',
                  color: 'black',
                  paddingRight: '10px',
                }}
                onChange={(e) => setTextArea(e.target.value)}
                value={textArea}
              />
            </div>
            <input type='submit' value='שלח' className={Style.btn_signup} />
          </form>
          <div className={Style.img_container}>
            <span className={Style.img_title}> במה תרצו לחסוך </span>
            <form className={`save-now-mui ${Style.checkboxes}`} ref={form2}>
              <FormControlLabel
                control={<Checkbox />}
                label='ביטוחים ופיננסים'
                onChange={(e) => handleChosenSubjects('ביטוחים ופיננסים')}
                name='checkbox'
              />
              <FormControlLabel
                control={<Checkbox />}
                label='דיור'
                onChange={(e) => handleChosenSubjects('דיור')}
                name='checkbox'
              />
              <FormControlLabel
                control={<Checkbox />}
                label='תקשורת'
                onChange={(e) => handleChosenSubjects('תקשורת')}
                name='checkbox'
              />
              <FormControlLabel
                control={<Checkbox />}
                label='מזון וקניות'
                onChange={(e) => handleChosenSubjects('מזון וקניות')}
                name='checkbox'
              />
              <FormControlLabel
                control={<Checkbox />}
                label='טיפוח'
                onChange={(e) => handleChosenSubjects('טיפוח')}
                name='checkbox'
              />
              <FormControlLabel
                control={<Checkbox />}
                label='ביגוד'
                onChange={(e) => handleChosenSubjects('ביגוד')}
                name='checkbox'
              />
              <FormControlLabel
                control={<Checkbox />}
                label='ביטוח'
                onChange={(e) => handleChosenSubjects('ביטוח')}
                name='checkbox'
              />
              <FormControlLabel
                control={<Checkbox />}
                label='רכב ונסיעות'
                onChange={(e) => handleChosenSubjects('רכב ונסיעות')}
                name='checkbox'
              />
              <FormControlLabel
                control={<Checkbox />}
                label='ילדים וחינוך'
                onChange={(e) => handleChosenSubjects('ילדים וחינוך')}
                name='checkbox'
              />
              <FormControlLabel
                control={<Checkbox />}
                label='בריאות'
                onChange={(e) => handleChosenSubjects('בריאות')}
                name='checkbox'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveNow;
