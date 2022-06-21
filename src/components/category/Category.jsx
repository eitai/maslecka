import React, { useState, useEffect } from 'react';
import TableRows from './table-rows/TableRows';
import Style from './category.module.scss';

const Category = ({ data, handleRemoveTable, tableIndex, handleRowUpdate }) => {
  const [rowsData, setRowsData] = useState([]);

  useEffect(() => {
    setRowsData(data.rows);
  }, [data]);

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
    handleRowUpdate(rowsData, tableIndex);
  };

  const handleChange = (index, event) => {
    if (event?.target?.name) {
      const { name, value } = event.target;
      const rowsInput = [...rowsData];
      rowsInput[index][name] = value;
      setRowsData(rowsInput);
    } else {
      const { value, label } = event;
      const rowsInput = [...rowsData];
      rowsInput[index][value] = label;
      setRowsData(rowsInput);
    }
    handleRowUpdate(rowsData, tableIndex);
  };

  return (
    <div className={`${Style.category_box}`}>
      <div className={Style.title}>
        <span>{data.title}</span>
        <button onClick={(el) => handleRemoveTable(el, tableIndex)}>X</button>
      </div>
      <div className={`col-sm-12 ${Style.table_container}`}>
        <table className='table'>
          <thead>
            <tr className={Style.firstrow}>
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

          <tbody className={Style.tbody}>
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
