import React, { useState, memo } from 'react';
import Select from 'react-select';
import Style from './tableRow.module.scss';

const customStyles = {
  option: (provided, state) => ({
    background: '#fff',
    cursor: 'pointer',
    color: '#000',
  }),
};

const TableRows = ({ rowsData, deleteTableRows, handleChange, isLocked }) => {
  return rowsData.map((data, index) => {
    const { kind, amount } = data;

    const dropdownData = [
      { value: 'expense', label: 'קבוע' },
      { value: 'expense', label: 'משתנה' },
    ];

    return (
      <tr key={index}>
        <td>
          <Select
            defaultValue={dropdownData[0]}
            options={dropdownData}
            className={`${Style.dropdown}`}
            onChange={(value) => handleChange(index, value)}
            name='expense'
            styles={customStyles}
          />
        </td>
        <td>
          <input
            type='text'
            defaultValue={kind ? kind : ''}
            onBlur={(evnt) => handleChange(index, evnt)}
            name='kind'
            className='form-control'
          />{' '}
        </td>
        <td>
          <input
            type='text'
            onBlur={(evnt) => handleChange(index, evnt)}
            name='amount'
            defaultValue={amount ? amount : ''}
            className='form-control'
            placeholder='סכום בשקלים'
          />
        </td>
        <td>
          {!isLocked ? (
            <button
              className='btn btn-outline-danger'
              onClick={() => deleteTableRows(index)}
            >
              x
            </button>
          ) : (
            <button className={`btn  ${Style.btn_disable}`}>x</button>
          )}
        </td>
      </tr>
    );
  });
};
export default TableRows;
