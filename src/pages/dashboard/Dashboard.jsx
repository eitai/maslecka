import React, { useState, useEffect, useId, useCallback, useMemo } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Category from '../../components/category/Category';
import Style from './dashboard.module.scss';
import { UserMock } from './userMock';
import AddTable from '../../components/category/add-table/AddTable';
import BarsChart from '../../components/charts/bars-chart/BarsChart';
import DonatChat from '../../components/charts/donut-chart/DonutChart';
import { v4 as uuid } from 'uuid';

const Dashboard = () => {
  const [tables, setTables] = useState([]);
  const [openAddTableModal, setOpenAddTableModal] = useState(false);

  const tablesChartData = useMemo(() => {
    const datasets = tables.map((category, index) => {
      const rowData = category.rows
        .map((row) => {
          const amout = row.amount;
          return amout;
        })
        .reduce((pv, cv) => {
          if (cv === '') {
            cv = 0;
            const prev = parseInt(cv);

            return prev + cv;
          } else {
            const prev = parseInt(pv);
            const curr = parseInt(cv);
            return prev + curr;
          }
        }, 0);
      return rowData;
    });

    const labels = tables.map((label) => {
      return label.title;
    });

    const data = {
      labels: labels,
      datasets: { labels: labels, data: datasets },
    };

    return data;
  }, [tables]);

  useEffect(() => {
    setTables(
      UserMock.sections.map((table) => ({
        ...table,
        id: uuid(),
      }))
    );
  }, []);

  const handleRemoveTable = (event, index) => {
    event.preventDefault();
    const tempTable = [...tables];
    tempTable.splice(index, 1);
    setTables(tempTable);
  };

  const handleRowUpdate = (event, index) => {
    const newTables = [...tables];
    newTables[index].rows = event;
    setTables(newTables);
  };
  const handleRemoveUpdate = (event, index) => {
    const newTables = [...tables];
    newTables[index].rows = event;
    setTables(newTables);
  };

  const handleAddTable = (value) => {
    const newTables = [...tables];
    newTables.push({
      id: uuid(),
      title: value,
      rows: [{ expense: '', kind: '', amount: '' }],
    });
    setTables(newTables);
    setOpenAddTableModal(false);
  };

  const closeAddTableModal = (e) => {
    e.preventDefault();
    setOpenAddTableModal(false);
  };

  const handleOpenAddTableModal = (e) => {
    setOpenAddTableModal(true);
  };

  return (
    <div>
      <Navbar isBackgroundColorOn={true} />
      <div>
        <div className={Style.btn_date_container}>
          <button>תאריך</button>
          <div>
            <button
              className={` ${!openAddTableModal && Style.btn_animation} ${
                Style.btn_addtable
              }`}
              onClick={(e) => handleOpenAddTableModal(e)}
            >
              הוספת טבלה
            </button>
            {openAddTableModal && (
              <AddTable
                closeAddTableModal={closeAddTableModal}
                handleAddTable={(e) => handleAddTable(e)}
              />
            )}
          </div>
        </div>
        <div className={Style.main_container}>
          <div className={Style.categories_container}>
            {tables?.map((table, index, arr) => {
              return (
                <Category
                  key={table.id}
                  data={table}
                  test={UserMock}
                  handleRemoveTable={handleRemoveTable}
                  tableIndex={index}
                  handleRowUpdate={handleRowUpdate}
                  test2={handleRemoveUpdate}
                />
              );
            })}
          </div>
          <div className={Style.graph_container}>
            <div className={Style.graph_bars}>
              <BarsChart tablesData={tablesChartData} />
            </div>
            <div className={Style.graph_donut}>
              <DonatChat tablesData={tablesChartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
