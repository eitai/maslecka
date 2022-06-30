import React, { useState, useEffect, useId, useCallback, useMemo } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Category from '../../components/category/Category';
import Style from './dashboard.module.scss';
import { UserMock } from './userMock';
import AddTable from '../../components/category/add-table/AddTable';
import BarsChart from '../../components/charts/bars-chart/BarsChart';
import DonatChat from '../../components/charts/donut-chart/DonutChart';
import { v4 as uuid } from 'uuid';
import MuiDatepicker from '../../components/datepicker/datepicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { he } from 'date-fns/locale';
import { saveNewTimeStamp, getUserTableDataByTimestamp } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

const Dashboard = () => {
  const [tables, setTables] = useState([]);
  const [openAddTableModal, setOpenAddTableModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeStamp, setSelectedTimeStamp] = useState(null);
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.user.user.uid);
  const [dataArrived, setDataArrived] = useState(false);
  const [labels, setLabels] = useState();

  useEffect(() => {
    const currentDateMoment = moment().format('M:YYYY');
    const newDate = currentDateMoment.split(':').join('');
    setSelectedTimeStamp(newDate);
    const jsDate = new Date();
    setSelectedDate(jsDate);
  }, []);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const data = await getUserTableDataByTimestamp(userId, selectedTimeStamp);
      setDataArrived(false);
      const tablesWithId = data?.timestamp.map((table) => ({
        ...table,
        id: uuid(),
      }));
      setTables(tablesWithId);
      setDataArrived(true);
      setLoading(false);
    }
    fetchData();
  }, [dataArrived]);

  const handleDateChange = async (date) => {
    setLoading(true);
    const currentDate = moment(date).format('M:YYYY');
    const newDate = currentDate.split(':').join('');
    setSelectedTimeStamp(newDate);
    setSelectedDate(date);
    const data = await getUserTableDataByTimestamp(userId, newDate);
    if (!data || data === undefined) {
      handleDateChange(date);
    }
    const tablesWithId = data?.timestamp.map((table) => ({
      ...table,
      id: uuid(),
    }));

    setTables(tablesWithId);
    setLoading(false);
    console.log(selectedTimeStamp);
  };

  const tablesChartData = useMemo(() => {
    const datasets = tables?.map((category, index) => {
      const rowData = category.rows
        .map((row) => {
          const amout = row.amount;
          return amout;
        })
        .reduce((pv, cv) => {
          if (_.isNumber(pv) && _.isNumber(cv)) {
            return pv + cv;
          } else {
            const prev = _.toNumber(pv);
            const curr = _.toNumber(cv);
            return prev + curr;
          }
        }, 0);
      return rowData;
    });

    const labels = tables?.map((label) => {
      return label.title;
    });
    const data = {
      labels: labels,
      datasets: { labels: labels, data: datasets },
    };
    setLabels(data);
    return data;
  }, [tables]);

  if (loading) return;
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
    console.log(newTables);
    saveNewTimeStamp(userId, selectedTimeStamp, newTables);
    console.log('usecallback run');
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
  console.log(loading);

  return (
    <div>
      <Navbar isBackgroundColorOn={true} />
      <div>
        <div className={Style.btn_date_container}>
          <div className='datepicker_container'>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={he}
            >
              <MuiDatepicker
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
              />
            </LocalizationProvider>
          </div>
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
            {tables &&
              tables?.map((table, index, arr) => {
                return (
                  <Category
                    key={table.id}
                    data={table}
                    test={UserMock}
                    handleRemoveTable={handleRemoveTable}
                    tableIndex={index}
                    handleRowUpdate={handleRowUpdate}
                    handleRemoveUpdate={handleRemoveUpdate}
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
