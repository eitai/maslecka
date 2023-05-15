import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UserMock } from './dashboard/userMock';
import { saveNewTimeStamp, getUserTableDataByTimestamp } from '../firebase';
const Test = () => {
  const UserId = useSelector((state) => state.user.user.uid);

  const handleSetDataToDB = () => {
    saveNewTimeStamp(UserId, UserMock, 1632132234200);
  };
  const handleGetDataFromDB = () => {
    getUserTableDataByTimestamp(UserId, 16321324234200).then((data) => {});
  };

  return (
    <div>
      <button onClick={handleSetDataToDB}>SET items</button>
      <span> </span>
      <button onClick={handleGetDataFromDB}>get items</button>
    </div>
  );
};

export default Test;
