import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Category from '../../components/category/Category';
import Style from './dashboard.module.scss';
const Dashboard = () => {
  const [rowsData, setRowsData] = useState([]);
  console.log(rowsData);
  const mockData = [
    {
      expense: '',
      kind: '',
      amount: '',
    },
  ];
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
  };
  return (
    <div>
      <Navbar isBackgroundColorOn={true} />
      <div className={Style.main_container}>
        <div className={Style.category_container}>
          <Category
            handleChange={handleChange}
            rowsData={rowsData}
            setRowsData={setRowsData}
          />
        </div>
        <div className={Style.graph_container}>
          <div>graph 1</div>
          <div>graph2</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
