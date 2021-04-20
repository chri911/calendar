import moment from 'moment';
import styles from '../styles/calendar.module.scss';
import { useState } from 'react';

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

  return result;
}

export const Calendar = () => {
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  const [today, setToday] = useState(moment().format('YYYY-MM-DD'));
  // const [date, setDate] = useState(moment().format('MMMM YYYY'));
  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState('');
  const monthData = createCalendar(date.getFullYear(), date.getMonth());


  let d = moment("20210401", "YYYYMMDD").format('dddd');  //Thursday
  // moment().format('ll'); 
  const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
  // console.log(startOfMonth); //4
  // console.log(today); //4
  // console.log(new Date(startOfMonth).getDay()); //4

  const handleClick = (day) => {
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
        <tfoot>
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
                <td key={index} onClick={() => handleClick(weekDay)}>
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