import React, { useState, useEffect, useId } from 'react';
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

  const handleRemoveTable = (event, index) => {
    const tempTable = [...tables];
    tempTable.splice(index, 1);
    setTables(tempTable);
  };

  const handleAddTable = (e, sectionName) => {
    const newTables = [...tables];
    newTables.push({
      id: uuid(),
      title: sectionName,
      rows: [{ expense: '', kind: '', amount: '' }],
    });
    setTables(newTables);
    setOpenAddTableModal(false);
  };

  useEffect(() => {
    setTables(
      UserMock.sections.map((table) => ({
        ...table,
        id: uuid(),
      }))
    );
  }, []);

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
            {' '}
            <button
              className={` ${!openAddTableModal && Style.btn_animation} ${
                Style.btn_addtable
              }`}
              onClick={(e) => handleOpenAddTableModal(e)}
            >
              הוספת טבלה
            </button>{' '}
            {openAddTableModal && (
              <AddTable
                closeAddTableModal={closeAddTableModal}
                handleAddTable={handleAddTable}
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
                  index={index}
                />
              );
            })}
          </div>
          <div className={Style.graph_container}>
            <div>
              <BarsChart tablesData={tables} />
            </div>
            <div>
              <DonatChat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
