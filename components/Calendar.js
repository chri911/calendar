import React from 'react';
import moment from 'moment';
import styles from '../styles/calendar.module.scss';
import { useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { actions } from './store';

function createCalendar(year, month) {
  const daysInWeek = 7;
  const daysInMonth = moment().daysInMonth();
  const result = [];
  const date = new Date(year, month);
  
  const startOfMonth = moment(date).startOf('month').format('YYYY-MM-DD');
  const monthStartsOn = new Date(startOfMonth).getDay();

  let day = monthStartsOn === 0 ? 1 : 1 - monthStartsOn;

  for (let i = 0; i < (daysInMonth + monthStartsOn) / daysInWeek; i++) {
    result[i] = [];

    for (let j = 0; j < daysInWeek; j++) {
      result[i][j] = new Date(year, month, day++)
    }
  }

  console.log(moment(result[1][1]).format('YYYY-MM-DD'));

  return result;
}

export const Calendar = () => {
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState('');
  const monthData = createCalendar(date.getFullYear(), date.getMonth());
  const dispatch = useDispatch();


  const handleClick = (day) => {
    console.log(day);
    
    dispatch(actions.changeDate(day))
    setSelectedDay(day)
  };

  const handlePrevMonthSelect = () => {
    const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1);
    setDate(prevMonth)
  };

  const handleNextMonthSelect = () => {
    const prevMonth = new Date(date.getFullYear(), date.getMonth() + 1);
    setDate(prevMonth)
  };

  return (
    <>
      <div className={styles.calendar__header}>
        <button className={styles.calendar__button} onClick={handlePrevMonthSelect}>
          {'<'}
        </button>
        <h3>{moment(date).format('MMMM YYYY')}</h3>
        <button className={styles.calendar__button} onClick={handleNextMonthSelect}>
          {'>'}
        </button>
      </div>  
      <table className={styles.calendar__table}>
        <tfoot className={styles.calendar__tfoot}>
          <tr>
            {weekDays.map((day, index) =>
              <td key={day + index}>
                {day}
              </td>
            )}
          </tr>
        </tfoot>
        <tbody>
          {monthData.map((week,index) => 
            <tr key={index}>
              {week.map((weekDay, index) =>
                <td
                  key={index}
                  onClick={() => handleClick(weekDay)}
                  className={classNames(styles.calendar__day, {
                    [styles.calendar__anotherMonth]: weekDay.getMonth() !== date.getMonth(),
                    [styles.calendar__selectedDate]: moment(weekDay).format('YYYY-MM-DD') === moment(selectedDay).format('YYYY-MM-DD'),
                    [styles.calendar__today]: moment(weekDay).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
                  })}
                >
                  {weekDay.getDate()}
                </td>
              )}
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}