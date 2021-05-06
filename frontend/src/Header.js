import styles from './Header.module.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className={styles.header}>
        <h1 className={styles.name}>LEARN BY PLANNING</h1>
        <nav className={styles.nav}>
            <Link className={styles.link} to='/'>Today</Link>
            <Link className={styles.link} to='/Calendar'>Calendar</Link>
            <Link className={styles.link} to='/List'>List</Link>
        </nav>
    </header>
  );
}

export default Header;