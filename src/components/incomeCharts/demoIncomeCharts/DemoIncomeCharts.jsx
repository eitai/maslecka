import React, { useState, useEffect, useMemo } from 'react';
import Category from '../../../components/category/Category';

import { incomeMock } from '../incomeMock';
import Style from './demoIncomeCharts.module.scss';
import { useSelector } from 'react-redux';
import {
  saveIncomeTablesNewTimeStamp,
  getUserIncomeTableDataByTimestamp,
} from '../../../firebase';
import { v4 as uuid } from 'uuid';
import { isNumber, toNumber } from 'lodash';

const DemoIncomeCharts = ({ selectedTimeStamp, setIncomeObj }) => {
  const [incomeTables, setIncomeTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataArrived, setDataArrived] = useState(false);

  const userId = useSelector((state) => state.user.user.uid);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      setIncomeTables(incomeMock);
    }
    fetchData();
  }, [selectedTimeStamp, dataArrived]);

  useEffect(() => {
    const tablesWithId = incomeMock.map((table) => ({
      ...table,
      id: uuid(),
    }));
    setIncomeTables(tablesWithId);
  }, []);

  const handleRowUpdate = (event, index) => {
    const newTables = [...incomeTables];
    newTables[index].rows = event;
    setIncomeTables(newTables);
  };

  useEffect(() => {
    if (incomeTables) {
      const datasets = incomeTables?.map((category, index) => {
        const rowData = category.rows
          .map((row) => {
            const amout = row.amount;
            return amout;
          })
          .reduce((pv, cv) => {
            if (isNumber(pv) && isNumber(cv)) {
              return pv + cv;
            } else {
              const prev = toNumber(pv);
              const curr = toNumber(cv);
              return prev + curr;
            }
          }, 0);

        return rowData;
      });
      const total = datasets ? datasets[0] + datasets[1] : '';
      setIncomeObj((prevState) => ({
        ...prevState,
        totalMan: datasets[0],
        totalWoman: datasets[1],
        total: total,
      }));
    }
  }, [incomeTables, setIncomeObj]);

  return (
    <div className={Style.container}>
      {' '}
      {incomeTables &&
        incomeTables.map((table, index) => {
          return (
            <div key={index}>
              <Category
                key={table.id}
                data={table}
                tableIndex={index}
                handleRowUpdate={handleRowUpdate}
                tablesColorClass={Style.tableColor}
                isIncome={true}
              />
            </div>
          );
        })}
    </div>
  );
};

export default DemoIncomeCharts;
