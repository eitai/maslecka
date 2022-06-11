import React from 'react';
import Style from './homePage.module.scss';
import Navbar from '../../components/navbar/Navbar';
import { AiFillPlayCircle } from 'react-icons/ai';
const HomePage = () => {
  return (
    <div>
      <div className={Style.container}>
        <Navbar />
        <div className={Style.text_container}>
          <h1 className={Style.title}>קצב פיננסי</h1>
          <p className={Style.subtitle}>מקצצים בעלויות מכפילים</p>
          <p className={Style.subtitle}>את החסכונות</p>
        </div>
        <div className={Style.btn_container}>
          <span className={Style.whitebg}></span>
          <button className={Style.btn_test}>
            <AiFillPlayCircle />
            להדגמה
          </button>
          <button className={Style.btn_reg}>הרשם עכשיו</button>
        </div>
      </div>
      <div className={Style.img_container}>
        <img
          src={require('../../assets/holdinghands.jpg')}
          alt=''
          className={Style.img}
        />
      </div>
      <div className={Style.title_learn_container}>
        <span className={Style.title_learn}>
          למדו <span className={Style.how}> איך:</span>
        </span>
      </div>
      <div className={Style.boxes}>
        <div className={Style.box}>
          <AiFillPlayCircle />
        </div>
        <div className={Style.box}>
          <AiFillPlayCircle />
        </div>
        <div className={Style.box}>
          <AiFillPlayCircle />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
