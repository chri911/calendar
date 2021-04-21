import Link from 'next/link';
import styles from '../styles/header.module.scss';
import Image from 'next/image';

export const MainLayout = ({children}) => {
  return (
    <>
      <header className={styles.header}>
        <div>
          <Link href={'/'}>
            <a className={styles.header__link}>
              <Image
                src="/logo.jpg"
                alt="logo"
                width={165}
                height={50}
              />
            </a>
          </Link>
        </div>
        <div>
          <Link href={'/'}>
            <a className={styles.header__link}>Home</a>
          </Link>
          <Link href={'/about'}>
            <a className={styles.header__link}>About</a>
          </Link>
        </div>
      </header>
      <main>
        {children}
      </main>
    </>
  )
}