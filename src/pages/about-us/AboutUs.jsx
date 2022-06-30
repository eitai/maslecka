import React from 'react';
import Style from './aboutUs.module.scss';
import Navbar from '../../components/navbar/Navbar';
const AboutUs = () => {
  return (
    <>
      <Navbar isBackgroundColorOn={true} />
      <div className={`container ${Style.container}`}>xx</div>;
    </>
  );
};

export default AboutUs;
