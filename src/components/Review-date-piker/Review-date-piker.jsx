import React, { useState } from 'react';
import datePikerIcon from '../../img/date-piker.png';
import { ConfigProvider, DatePicker, Calendar } from 'antd';
import ruRU from 'antd/es/locale/ru_RU';
import dayjs from 'dayjs'; // Import dayjs
import 'dayjs/locale/ru'; // Import the locale for dayjs
import './review-date-piker.css';

dayjs.locale('ru');

export default function ReviewDatePiker() {
  const [selectedDate, setSelectedDate] = useState();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleRelativeDate = (days) => {
    const newDate = selectedDate.add(days, 'day');
    setSelectedDate(newDate);
  };

  const handleTodayDate = () => {
    const currentDate = dayjs();
    setSelectedDate(currentDate);
  };

  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        components: {
          DatePicker: {
            cellRangeBorderColor: '#BAB6B4',
            cellHoverBg: '#A7221F',
            cellWidth: 29,
            cellHeight: 29,
          },
        },
        token: {
          colorPrimary: '#BAB6B4',
          borderRadius: 12,
          fontFamily: 'Roboto',
          boxShadowSecondary: '0px 4px 25px 0px rgba(0, 0, 0, 0.50)',
          padding: 12,
        },
      }}>
      <DatePicker
        allowClear={false}
        format='DD.MM.YYYY'
        className='review-date-piker'
        popupClassName='review-date-piker'
        suffixIcon={<img src={datePikerIcon} alt='календарь' />}
        showToday={false}
        value={selectedDate}
        onChange={handleDateChange}
        renderExtraFooter={() => (
          <div className='review-date-piker__footer'>
            <button onClick={() => handleRelativeDate(-2)} className='review-date-piker__button'>
              Позавчера
            </button>
            <button onClick={() => handleRelativeDate(-1)} className='review-date-piker__button'>
              Вчера
            </button>
            <button onClick={() => handleTodayDate()} className='review-date-piker__button'>
              Сегодня
            </button>
          </div>
        )}
      />
    </ConfigProvider>
  );
}
