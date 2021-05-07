import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className={styles.header}>
        <h1 className={styles.name}>LEARN BY PLANNING</h1>
        <nav id='navBar' className={styles.nav}>
          <NavLink activeClassName={styles.tabActive} className={styles.link} exact to='/'>Today</NavLink>
          <NavLink activeClassName={styles.tabActive} className={styles.link} to='/Calendar'>Calendar</NavLink>
          <NavLink activeClassName={styles.tabActive} className={styles.link} to='/List'>List</NavLink>
        </nav>
    </header>
  );
}

export default Header;