import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import Editor from '../editor/editor';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ authService }) => {
  const [cards, setCards] = useState({
    1: {
      id: '1',
      name: 'Ellie',
      company: 'Samsung',
      theme: 'dark',
      title: 'Software Engineer',
      email: 'ellie@gmail.com',
      message: 'go for it',
      fileName: 'ellie',
      fileURL: null,
    },
    2: {
      id: '2',
      name: 'Ellie2',
      company: 'Samsung',
      theme: 'light',
      title: 'Software Engineer',
      email: 'ellie@gmail.com',
      message: 'go for it',
      fileName: 'ellie',
      fileURL: 'ellie.png',
    },
    3: {
      id: '3',
      name: 'Ellie3',
      company: 'Samsung',
      theme: 'colorful',
      title: 'Software Engineer',
      email: 'ellie@gmail.com',
      message: 'go for it',
      fileName: 'ellie',
      fileURL: null,
    },
  });

  const navigate = useNavigate();

  const onLogout = () => authService.logout();

  useEffect(() => {
    authService.onnAuthChanged((user) => {
      !user && navigate('/');
    });
  }, []);

  const createOrUpdateCard = (card) =>
    setCards((prev) => {
      const updated = { ...prev };
      updated[card.id] = card;
      return updated;
    });

  const deleteCard = (card) =>
    setCards((prev) => {
      const updated = { ...prev };
      delete updated[card.id];
      return updated;
    });

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          cards={cards}
          createOrUpdateCard={createOrUpdateCard}
          deleteCard={deleteCard}
        />
        <Preview cards={cards} />
      </div>
      <Footer />
    </section>
  );
};

export default Maker;
