import React, { useState } from 'react';

import Card from './Card';
import AddPlacePopup from "./AddPlacePopup";

import api from "../utils/api";

import ImagePopup from "mesto_ui_kit/ImagePopup";

import "../index.css";

const MESSAGE_KEY = "add-place-trigger";

function triggerAddPlacePopup() {
  console.log("triggered");
  window.postMessage({
    type: MESSAGE_KEY
  });
}

const Places = () => {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [userId, setUserId] = useState();

  // Запрос к API за информацией о массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getCardList()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setUserId(userData._id);
      })
      .catch((err) => console.log(err));
  }, []);

  
  React.useEffect(() => {
    function listener(e) {
      if (e.data.type === MESSAGE_KEY) {
        setIsAddPlacePopupOpen(true);
      }
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, [setIsAddPlacePopupOpen]);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === userId);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(newCard) {
    api
      .addCard(newCard)
      .then((newCardFull) => {
        setCards([newCardFull, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch((err) => console.log(err));
  }

  return (
    <section className="places page__section">
      <ul className="places__list">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            userId={userId}
          />
        ))}
      </ul>
      <ImagePopup card={selectedCard} onClose={() => setSelectedCard(undefined)} />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlaceSubmit}
        onClose={() => setIsAddPlacePopupOpen(false)}
      />
    </section>
  );
}

export { Places, triggerAddPlacePopup };
