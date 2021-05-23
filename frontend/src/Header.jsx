import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import authContext from './authContext';
import styles from './Header.module.css';

function Header() {
  const { setAuth } = useContext(authContext);
  function logoutUser() {
    setAuth(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1 className={styles.name}>LEARN BY PLANNING</h1>
        <button type="button" onClick={logoutUser} className={styles.logbutton}>Logout</button>
      </div>
      <nav id="navBar" className={styles.nav}>
        <NavLink activeClassName={styles.tabActive} className={styles.link} to="/Today">Today</NavLink>
        <NavLink activeClassName={styles.tabActive} className={styles.link} to="/Calendar">Calendar</NavLink>
        <NavLink activeClassName={styles.tabActive} className={styles.link} to="/List">List</NavLink>
      </nav>
    </header>
  );
}

export default Header;
