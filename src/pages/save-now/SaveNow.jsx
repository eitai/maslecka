import React, { useState, useEffect, useRef } from 'react';
import Style from './saveNow.module.scss';
import Navbar from '../../components/navbar/Navbar';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import emailjs from 'emailjs-com';
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
  border: '1px solid black',
  borderRadius: '5px',
};

const SaveNow = () => {
  const [subjects, setSubjects] = useState([]);
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
      subject: subjects,
    };
    debugger;
    sendEmail(userMessage);
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
  console.log(subjects);
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
              sx={inputStyle}
              style={{
                width: '25rem',
                border: '1px solid black',
                height: 70,
                display: 'block',
                marginBottom: '15px',
                color: 'rgba(0, 0, 0, 1)',
                paddingRight: '10px',
              }}
              onChange={(e) => setTextArea(e.target.value)}
              value={textArea}
            />
            <input type='submit' value='שלח' className={Style.btn_signup} />
          </form>
          <div className={Style.img_container}>
            <span className={Style.img_title}>בחרו נושאי פנייה</span>
            <div className={`save-now-mui ${Style.checkboxes}`}>
              <FormControlLabel
                control={<Checkbox />}
                label='ביטוחים ופיננסים'
                onChange={(e) => handleChosenSubjects('ביטוחים ופיננסים')}
              />
              <FormControlLabel
                control={<Checkbox />}
                label='דיור'
                onChange={(e) => handleChosenSubjects('דיור')}
              />
              <FormControlLabel
                control={<Checkbox />}
                label='תקשורת'
                onChange={(e) => handleChosenSubjects('תקשורת')}
              />
              <FormControlLabel
                control={<Checkbox />}
                label='מזון וקניות'
                onChange={(e) => handleChosenSubjects('מזון וקניות')}
              />
              <FormControlLabel
                control={<Checkbox />}
                label='טיפוח'
                onChange={(e) => handleChosenSubjects('טיפוח')}
              />
              <FormControlLabel
                control={<Checkbox />}
                label='ביגוד'
                onChange={(e) => handleChosenSubjects('ביגוד')}
              />
              <FormControlLabel
                control={<Checkbox />}
                label='ביטוח'
                onChange={(e) => handleChosenSubjects('ביטוח')}
              />
              <FormControlLabel
                control={<Checkbox />}
                label='רכב ונסיעות'
                onChange={(e) => handleChosenSubjects('רכב ונסיעות')}
              />
              <FormControlLabel
                control={<Checkbox />}
                label='ילדים וחינוך'
                onChange={(e) => handleChosenSubjects('ילדים וחינוך')}
              />
              <FormControlLabel
                control={<Checkbox />}
                label='בריאות'
                onChange={(e) => handleChosenSubjects('בריאות')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveNow;
