import React from 'react';
import moment from 'moment';
import styles from '../styles/calendar.module.scss';
import { useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './store';
import Modal from 'react-modal';
import { Popup } from './Popup';

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

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export const Calendar = () => {
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const dispatch = useDispatch();
  const selectedDay = useSelector(state => state.date);
  const [date, setDate] = useState(new Date());
  const monthData = createCalendar(date.getFullYear(), date.getMonth());
  const [modalIsOpen,setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  }

  const handleClick = (day) => {
    dispatch(actions.changeDate(day));

    setIsOpen(true);
  };

  const handlePrevMonthSelect = () => {
    const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1);

    setDate(prevMonth);
  };

  const handleNextMonthSelect = () => {
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1);

    setDate(nextMonth);
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.calendar__header}>
        <button
          className={styles.calendar__button}
          onClick={handlePrevMonthSelect}
        >
          {'<'}
        </button>
        <h3>
          {moment(date).format('MMMM YYYY')}
        </h3>
        <button
          className={styles.calendar__button}
          onClick={handleNextMonthSelect}
        >
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
              {week.map((weekDay, index) => {
                const today = moment().format('YYYY-MM-DD');
                const currentDay = moment(weekDay).format('YYYY-MM-DD');
                const dayFromStore = moment(selectedDay).format('YYYY-MM-DD');
                
                return (
                  <td
                    key={index}
                    onClick={() => handleClick(weekDay)}
                    className={classNames(styles.calendar__day, {
                      [styles.calendar__anotherMonth]: weekDay.getMonth() !== date.getMonth(),
                      [styles.calendar__selectedDate]: currentDay === dayFromStore
                        && currentDay !== today,
                      [styles.calendar__today]: currentDay === today
                    })}
                  >
                    {weekDay.getDate()}
                  </td>
              )})}
            </tr>
          )}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <Popup closeModal={closeModal}/>
      </Modal>
    </div>
  )
}