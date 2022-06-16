import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Category from '../../components/category/Category';
import Style from './dashboard.module.scss';
const Dashboard = () => {
  return (
    <div>
      <Navbar isBackgroundColorOn={true} />
      <div className={Style.main_container}>
        <div className={Style.category_container}>
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
          <Category />
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
