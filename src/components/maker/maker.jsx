import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../footer/footer';
import Header from '../header/header';
import Editor from '../editor/editor';
import Preview from '../preview/preview';
import styles from './maker.module.css';

const Maker = ({ FileInput, authService, cardRepository }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cards, setCards] = useState({});
  const [userId, setUserId] = useState(location.state.id);

  useEffect(() => {
    authService.onnAuthChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        navigate('/');
      }
    });
  }, [authService, navigate]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const stopSync = cardRepository.syncCards(userId, (cards) => {
      setCards(cards);
    });
    return () => stopSync();
  }, [userId, cardRepository]);

  const onLogout = useCallback(() => authService.logout(), [authService]);

  const createOrUpdateCard = (card) => {
    setCards((prev) => {
      const updated = { ...prev };
      updated[card.id] = card;
      return updated;
    });
    cardRepository.saveCard(userId, card);
  };

  const deleteCard = (card) => {
    setCards((prev) => {
      const updated = { ...prev };
      delete updated[card.id];
      return updated;
    });
    cardRepository.removeCard(userId, card);
  };

  return (
    <section className={styles.maker}>
      <Header onLogout={onLogout} />
      <div className={styles.container}>
        <Editor
          FileInput={FileInput}
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
