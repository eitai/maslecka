import React, { useState, useEffect } from 'react';
import Style from './addTable.module.scss';
const AddTable = ({ handleAddTable, closeAddTableModal }) => {
  const [sectionName, setSectionName] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;

    const section = value;
    setSectionName(section);
  };

  return (
    <>
      <div className={Style.container}>
        <button className={Style.closemodal} onClick={closeAddTableModal}>
          X
        </button>
        <span className={Style.title}>הוספת טבלה</span>
        <input
          type='text'
          placeholder={`הכנס קטגוריה`}
          className={Style.input}
          value={sectionName}
          onChange={(event) => handleChange(event)}
        />
        <div className={Style.btn_container}>
          <button
            className={Style.btn}
            onClick={() => handleAddTable(sectionName)}
          >
            הוסף טבלה
          </button>
        </div>
      </div>
    </>
  );
};

export default AddTable;
