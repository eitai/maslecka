import React, { useState, useEffect } from 'react';
import TableRows from './table-rows/TableRows';
import Style from './category.module.scss';
import { AiOutlineHome, AiFillCar } from 'react-icons/ai';

import {
  GiShoppingCart,
  GiFemaleLegs,
  GiClothes,
  GiHealingShield,
} from 'react-icons/gi';
import { TbMoodKid } from 'react-icons/tb';
import { MdSportsBasketball } from 'react-icons/md';
import { FaCoins, FaSatelliteDish } from 'react-icons/fa';
import { FcBusinessman, FcBusinesswoman } from 'react-icons/fc';

const Category = ({
  data,
  handleRemoveUpdate,
  handleRemoveTable,
  tableIndex,
  handleRowUpdate,
  tablesColorClass,
  isIncome,
}) => {
  const [rowsData, setRowsData] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const IncomeIcons = [FcBusinessman, FcBusinesswoman];
  const IncomeIcon = IncomeIcons[tableIndex];
  const Icons = [
    AiOutlineHome,
    FaSatelliteDish,
    GiShoppingCart,
    GiFemaleLegs,
    GiClothes,
    AiFillCar,
    TbMoodKid,
    MdSportsBasketball,
    GiHealingShield,
    FaCoins,
  ];
  const Icon = Icons[tableIndex];
  useEffect(() => {
    setRowsData(data.rows);
    setIsLocked(data.isLocked);
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

    handleRemoveUpdate(rows, tableIndex);
  };

  const handleChange = (index, event) => {
    if (event.target.value !== '') {
      if (event?.target?.name) {
        const { name, value } = event.target;
        const intValue = parseInt(value);
        const rowsInput = [...rowsData];
        rowsInput[index][name] = intValue;
        setRowsData(rowsInput);
      } else {
        const { value, label } = event;
        // const intValue = parseInt(value);
        const rowsInput = [...rowsData];
        rowsInput[index][value] = label;
        setRowsData(rowsInput);
      }
      handleRowUpdate(rowsData, tableIndex);
    }
  };

  return (
    <div className={`${Style.category_box}`}>
      <div className={`${tablesColorClass} ${Style.title}`}>
        <div>
          {' '}
          <span>{data.title} </span>
          {isLocked && !isIncome && <Icon />}
          {isLocked && isIncome && <IncomeIcon />}
        </div>
        {!isLocked ? (
          <button onClick={(el) => handleRemoveTable(el, tableIndex)}>X</button>
        ) : (
          <span className={Style.close_disable}>X</span>
        )}
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
              isLocked={isLocked}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
