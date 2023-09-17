import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  // Если айди совпадают — показываем кнопку удаления
  const isOwn = card.owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((id) => id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like-button ${
    isLiked && "card__like-button_active"
  }`;

  return (
    <li className="card">
      <img
        className="card__photo"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <div className="card__caption">
        <h2 className="card__title">{card.name}</h2>
        {isOwn && (
          <button
            className="card__delete-button opacity"
            type="button"
            onClick={() => onCardDelete(card)}
          />
        )}
        <div className="card__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={() => onCardLike(card)}
          ></button>
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
