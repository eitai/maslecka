import React, { useState, useEffect } from 'react';
import Style from './addTable.module.scss';
const AddTable = () => {
  const [section, setSection] = useState('');

  return (
    <div className={Style.container}>
      <span className={Style.title}>הוספת טבלה</span>
      <input type='text' placeholder={`הכנס קטגוריה`} className={Style.input} />
      <div className={Style.btn_container}>
        <button className={Style.btn}>הוסף טבלה</button>
      </div>
    </div>
  );
};

export default AddTable;
