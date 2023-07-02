import React, { useState, useEffect, useMemo } from 'react';
import Category from '../../components/category/Category';
import Style from '../dashboard/dashboard.module.scss';
import AddTable from '../../components/category/add-table/AddTable';
import BarsChart from '../../components/charts/bars-chart/BarsChart';
import DonatChat from '../../components/charts/donut-chart/DonutChart';
import { v4 as uuid } from 'uuid';
import MuiDatepicker from '../../components/datepicker/datepicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { he } from 'date-fns/locale';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { isNumber, toNumber } from 'lodash';
import DemoIncomeCharts from '../../components/incomeCharts/demoIncomeCharts/DemoIncomeCharts';
import { UserMock } from '../dashboard/userMock';

const DemoPage = () => {
  const [tables, setTables] = useState([]);
  const [openAddTableModal, setOpenAddTableModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeStamp, setSelectedTimeStamp] = useState(null);
  const [loading, setLoading] = useState(false);
  const userId = useSelector((state) => state.user.user.uid);
  const [dataArrived, setDataArrived] = useState(false);
  const [labels, setLabels] = useState();
  const [incomeObj, setIncomeObj] = useState({
    totalWoman: '',
    totalMan: '',
    total: '',
  });
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
      const tablesWithId = UserMock.map((table) => ({
        ...table,
        id: uuid(),
      }));
      setTables(tablesWithId);

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

    const tablesWithId = UserMock.map((table) => ({
      ...table,
      id: uuid(),
    }));

    setTables(tablesWithId);
    setLoading(false);
  };

  const tablesChartData = useMemo(() => {
    const datasets = tables?.map((category, index) => {
      const rowData = category.rows
        .map((row) => {
          const amout = row.amount;
          return amout;
        })
        .reduce((pv, cv) => {
          if (isNumber(pv) && isNumber(cv)) {
            return pv + cv;
          } else {
            const prev = toNumber(pv);
            const curr = toNumber(cv);
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
            <div className={Style.income_container}>
              <DemoIncomeCharts
                selectedTimeStamp={selectedTimeStamp}
                setIncomeObj={setIncomeObj}
              />
            </div>

            {tables &&
              tables?.map((table, index, arr) => {
                return (
                  <Category
                    key={index}
                    data={table}
                    handleRemoveTable={handleRemoveTable}
                    tableIndex={index}
                    handleRowUpdate={handleRowUpdate}
                    handleRemoveUpdate={handleRemoveUpdate}
                    tablesColorClass={Style.tableColor}
                  />
                );
              })}
          </div>
          <div className={Style.graph_container}>
            <div className={Style.total_Main_container}>
              <div className={Style.total_container}>
                <div className={Style.total}>
                  <div>
                    הכנסות משק בית
                    <span></span>:<span> </span>
                  </div>
                  <div>
                    {' '}
                    <span>{incomeObj.totalMan}</span>
                    <span className={Style.nis}>ש"ח </span>
                  </div>
                </div>
                <div className={Style.total}>
                  <div>
                    פיננסים חסכונות והשקעות משק בית
                    <span></span>:<span> </span>
                  </div>
                  <div>
                    {' '}
                    <span>{incomeObj.totalWoman}</span>
                    <span className={Style.nis}>ש"ח </span>
                  </div>
                </div>
              </div>
              <div className={Style.total}>
                <div>
                  <span> סה"כ הכנסות:</span>
                  <span> </span>
                </div>
                <div>
                  <span>{incomeObj.total}</span>
                  <span className={Style.nis}>ש"ח </span>
                </div>
              </div>
            </div>

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

export default DemoPage;
