import React, { useState } from 'react';
import TableRows from './table-rows/TableRows';
import Style from './category.module.scss';

const Category = () => {
  const [rowsData, setRowsData] = useState([]);

  const addTableRows = () => {
    const rowsInput = {
      fullName: '',
      emailAddress: '',
      salary: '',
    };
    setRowsData([...rowsData, rowsInput]);
  };
  const deleteTableRows = (index) => {
    const rows = [...rowsData];
    rows.splice(index, 1);
    setRowsData(rows);
  };

  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput = [...rowsData];
    rowsInput[index][name] = value;
    setRowsData(rowsInput);
  };
  return (
    <div className={`${Style.category_box}`}>
      <div className={Style.title}>
        <span>דיור</span>
      </div>
      <div className={`col-sm-12 ${Style.table_container}`}>
        <table className='table'>
          <thead>
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
