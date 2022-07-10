import React, { useState, useEffect } from 'react';
import Category from '../../components/category/Category';

import { incomeMock } from './incomeMock';
import Style from './incomeCharts.module.scss';
import { useSelector } from 'react-redux';
import {
  saveIncomeTablesNewTimeStamp,
  getUserIncomeTableDataByTimestamp,
} from '../../firebase';
import { v4 as uuid } from 'uuid';

const IncomeCharts = ({ selectedTimeStamp }) => {
  const [incomeTables, setIncomeTables] = useState([]);
  const userId = useSelector((state) => state.user.user.uid);

  useEffect(() => {
    debugger;
    getUserIncomeTableDataByTimestamp(userId, selectedTimeStamp);
  }, [selectedTimeStamp]);

  useEffect(() => {
    const tablesWithId = incomeMock?.map((table) => ({
      ...table,
      id: uuid(),
    }));
    setIncomeTables(tablesWithId);
  }, []);
  const handleRowUpdate = (event, index) => {
    const newTables = [...incomeTables];
    newTables[index].rows = event;
    setIncomeTables(newTables);
    saveIncomeTablesNewTimeStamp(userId, selectedTimeStamp, newTables);
  };
  return (
    <div className={Style.container}>
      {' '}
      {incomeTables &&
        incomeTables?.map((table, index, arr) => {
          return (
            <Category
              key={table.id}
              data={table}
              tableIndex={index}
              handleRowUpdate={handleRowUpdate}
              tablesColorClass={Style.tableColor}
            />
          );
        })}
    </div>
  );
};

export default IncomeCharts;
