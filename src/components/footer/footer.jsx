import React from 'react';
import styles from './footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <p className={styles.title}>Code Your Dream</p>
  </footer>
);

export default React.memo(Footer);
