import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Category from '../../components/category/Category';
import Style from './dashboard.module.scss';
import { UserMock } from './userMock';
import AddTable from '../../components/category/add-table/AddTable';
const Dashboard = () => {
  console.log(UserMock, 'usermockData');
  const [tables, setTables] = useState([]);
  const [isAddTable, setIsAddTable] = useState(false);

  const handleRemoveTable = (event, index) => {
    const { name, value } = event.target;

    const tempTable = [...tables];
    tempTable.splice(index, 1);
    setTables(tempTable);
  };

  const handleAddTable = (e) => {
    e.preventDefault();
    setIsAddTable(true);
  };

  useEffect(() => {
    setTables(UserMock.sections);
  }, []);

  return (
    <div>
      <Navbar isBackgroundColorOn={true} />
      <div>
        <div className={Style.btn_date_container}>
          <button>תאריך</button>

          <div>
            {' '}
            <button
              className={` ${!isAddTable && Style.btn_animation} ${
                Style.btn_addtable
              }`}
              onClick={(e) => handleAddTable(e)}
            >
              הוספת טבלה
            </button>{' '}
            {isAddTable && <AddTable closeAddDropdown={setIsAddTable} />}
          </div>
        </div>
        <div className={Style.main_container}>
          <div className={Style.category_container}>
            {tables?.map((el, index, arr) => {
              const date = new Date().getTime().toString();

              return (
                <Category
                  key={date + index}
                  data={el}
                  test={UserMock}
                  handleRemoveTable={handleRemoveTable}
                  index={index}
                />
              );
            })}
          </div>
          <div className={Style.graph_container}>
            <div>graph 1</div>
            <div>graph2</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
