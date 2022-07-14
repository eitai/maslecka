import React from "react";
import style from "./adPopup.module.scss";
import { GrFormClose } from "react-icons/gr";

const AdPopup = ({ setIsAdPopupOpen }) => {
  return (
    <div className={style.container}>
      <GrFormClose
        className={style.closeIcon}
        onClick={() => setIsAdPopupOpen(false)}
      />
    </div>
  );
};

export default AdPopup;
