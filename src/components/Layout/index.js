import React from 'react';
import styles from './styles.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.root}>
      {children}
    </div>
  );
};

export default Layout;
