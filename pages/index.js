import styles from '../styles/main.module.scss'
import { MainLayout } from '../components/MainLayout'

export default function Home() {
  return (
    <MainLayout>
      <main className={styles.main}>
        <div className={styles.main__info}>
          <h1 className={styles.main__title}>
            Choose the day for the meeting
          </h1>
          <h2 className={styles.main__subtitle}>
            We encourage you to book your appointment online. This will save you time.
          </h2>
        </div>
        <div className={styles.main__calendar}></div>
      </main>
    </MainLayout>
  )
}
