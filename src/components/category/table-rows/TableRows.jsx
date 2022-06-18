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

const TableRows = ({ rowsData, deleteTableRows, handleChange }) => {
  return rowsData.map((data, index) => {
    const { expense, kind, amount } = data;

    const dropdownData = [
      { value: 'expense', label: 'קבוע' },
      { value: 'expense', label: 'משתנה' },
    ];
    return (
      <tr key={index}>
        <td>
          {/* <input
            type='text'
            value={fullName}
            onChange={(event) => handleChange(index, event)}
             name='expense'
            className='form-control'
          /> */}
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
            value={kind}
            onChange={(evnt) => handleChange(index, evnt)}
            name='kind'
            className='form-control'
          />{' '}
        </td>
        <td>
          <input
            type='text'
            value={amount}
            onChange={(evnt) => handleChange(index, evnt)}
            name='amount'
            className='form-control'
            placeholder='סכום בשקלים'
          />{' '}
        </td>
        <td>
          <button
            className='btn btn-outline-danger'
            onClick={() => deleteTableRows(index)}
          >
            x
          </button>
        </td>
      </tr>
    );
  });
};
export default TableRows;
