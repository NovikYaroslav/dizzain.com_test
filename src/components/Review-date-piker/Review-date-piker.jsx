import React, { useState } from 'react';
import datePikerIcon from '../../img/date-piker.png';
import down from '../../img/../img/down-arrow.png';
import up from '../../img/Up-arrow.png';
import { ConfigProvider, DatePicker } from 'antd';
import ruRU from 'antd/es/locale/ru_RU';
import dayjs from 'dayjs';
import './review-date-piker.css';

export default function ReviewDatePiker() {
  const [selectedDate, setSelectedDate] = useState();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleRelativeDate = (days) => {
    const currentDate = dayjs();
    const newDate = currentDate.add(days, 'day');
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
            activeShadow: '',
            cellRangeBorderColor: '#BAB6B4',
            cellHoverBg: '#A7221F',
            cellWidth: 29,
            cellHeight: 29,
          },
        },
        token: {
          colorPrimary: '#7E7770',
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
        placeholder=''
        size='large'
        prevIcon={<img src={down} alt='стрелка вниз' />}
        nextIcon={<img src={up} alt='стрелка вверх' />}
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
