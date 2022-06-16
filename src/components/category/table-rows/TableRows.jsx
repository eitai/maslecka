import React, { useState } from 'react';
import Select from 'react-select';
import Style from './tableRow.module.scss';
const TableRows = ({ rowsData, deleteTableRows, handleChange }) => {
  return rowsData.map((data, index) => {
    const { fullName, emailAddress, salary } = data;
    const dropdownData = [
      { value: 'קבוע', label: 'קבוע' },
      { value: 'משתנה', label: 'משתנה' },
    ];
    return (
      <tr key={index}>
        <td>
          {/* <input
            type='text'
            value={fullName}
            onChange={(event) => handleChange(index, event)}
            name='fullName'
            className='form-control'
          /> */}
          <Select
            defaultValue={dropdownData[0]}
            options={dropdownData}
            className={`${Style.dropdown}`}
          />
        </td>
        <td>
          <input
            type='text'
            value={emailAddress}
            onChange={(evnt) => handleChange(index, evnt)}
            name='emailAddress'
            className='form-control'
          />{' '}
        </td>
        <td>
          <input
            type='text'
            value={salary}
            onChange={(evnt) => handleChange(index, evnt)}
            name='salary'
            className='form-control'
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
