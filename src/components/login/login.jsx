import React, { useCallback, useEffect } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import styles from './login.module.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ authService }) => {
  const navigate = useNavigate();

  const onLogin = (event) => {
    authService
      .login(event.currentTarget.textContent) //
      .then((data) => goToMaker(data?.user?.uid)) //
      .catch((err) => alert(`Login Error! : ${err}`));
  };

  const goToMaker = useCallback(
    (userId) => navigate('/maker', { state: { id: userId } }),
    [navigate]
  );

  useEffect(() => {
    authService.onnAuthChanged((user) => {
      user && goToMaker(user?.uid);
    });
  }, [authService, goToMaker]);

  return (
    <section className={styles.login}>
      <Header />
      <section>
        <h1>Login</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Google
            </button>
          </li>
          <li className={styles.item}>
            <button className={styles.button} onClick={onLogin}>
              Github
            </button>
          </li>
        </ul>
      </section>
      <Footer />
    </section>
  );
};

export default Login;
