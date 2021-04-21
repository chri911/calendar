import moment from "moment";
import { useSelector } from "react-redux";
import styles from '../styles/popup.module.scss';

export const Popup = ({closeModal}) => {
  const selectedDay = useSelector(state => state.date);
  const month = moment(selectedDay).format('MMMM');
  const day = moment(selectedDay).format('DD[th] dddd');

  return (
  <>
    <form className={styles.form}>
      <div className={styles.form__group}>
        <label htmlFor="month" className={styles.form__label}>
          Month
        </label>
        <input value={month} id="month" className={styles.form__input}></input>
      </div>
      <div className={styles.form__group}>
        <label htmlFor="day" className={styles.form__label}>
          Day
        </label>
        <input value={day} id="day" className={styles.form__input}></input>
      </div>
    </form>
    <button onClick={closeModal} className={styles.button}>
        x
    </button>
  </>
  )
};
