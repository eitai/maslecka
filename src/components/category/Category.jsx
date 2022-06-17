import React, { useState } from 'react';
import TableRows from './table-rows/TableRows';
import Style from './category.module.scss';

const Category = ({ handleChange, rowsData, setRowsData }) => {
  const addTableRows = () => {
    const rowsInput = {
      expense: '',
      kind: '',
      amount: '',
    };
    setRowsData([...rowsData, rowsInput]);
  };
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  return (
    <div className={`${Style.category_box}`}>
      <div className={Style.title}>
        <span>דיור</span>
      </div>
      <div className={`col-sm-12 ${Style.table_container}`}>
        <table className='table'>
          <thead className={Style.thead}>
            <tr>
              <th>הוצאה</th>
              <th>סוג הוצאה</th>
              <th>סכום</th>
              <th>
                <button
                  className='btn btn-outline-success'
                  onClick={addTableRows}
                >
                  +
                </button>
              </th>
            </tr>
          </thead>

          <tbody>
            <TableRows
              rowsData={rowsData}
              deleteTableRows={deleteTableRows}
              handleChange={handleChange}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
