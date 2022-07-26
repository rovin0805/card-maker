import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import styles from './maker.module.css';

const Maker = ({ authService }) => {
  const navigate = useNavigate();

  const onLogout = () => authService.logout();

  useEffect(() => {
    authService.onnAuthChanged(user => {
      !user && navigate('/');
    });
  }, []);

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <Footer />
    </section>
  );
};

export default Maker;
