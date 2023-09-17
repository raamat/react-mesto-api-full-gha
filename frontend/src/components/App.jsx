import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { api } from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import * as auth from "../utils/auth.js";

import RegOkImg from "../images/reg-ok.svg";
import RegErrImg from "../images/reg-error.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [isRegOkInfoTooltipOpen, setIsRegOkInfoTooltipOpen] = useState(false);
  const [isRegErrInfoTooltipOpen, setIsRegErrInfoTooltipOpen] = useState(false);

  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isCardsLoading, setIsCardsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();

  function handleRegister(checkReg) {
    checkReg
      .then(() => {
        setIsRegOkInfoTooltipOpen(true);
        navigate("sign-in");
      })
      .catch(() => setIsRegErrInfoTooltipOpen(true));
  }

  function signOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
    setEmail(null);
  }

  useEffect(() => {
    if (!isLoggedIn) return;
    setIsProfileLoading(true);
    api
      .getUserInfoServer()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsProfileLoading(false));

    setIsCardsLoading(true);
    api
      .getInitialCards()
      .then((cardsList) => {
        setCards(cardsList);
      })
      .catch((err) => console.log(err, 'Error !!!'))
      .finally(() => setIsCardsLoading(false));
  }, [isLoggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsRegOkInfoTooltipOpen(false);
    setIsRegErrInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((id) => id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .setLikeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCardServer(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser(infoUser) {
    setIsProfileLoading(true);
    api
      .setUserInfoServer(infoUser)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsProfileLoading(false));
  }

  function handleUpdateAvatar(userAvatar) {
    setIsProfileLoading(true);
    api
      .updateAvatarServer(userAvatar.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsProfileLoading(false));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsCardsLoading(true);
    api
      .setCardServer({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsCardsLoading(false));
  }

  function checkToken() {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) return;
    auth
      .getContent(jwt)
      .then((data) => {
        if (!data) {
          return;
        }
        setEmail(data.email);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        setLoggedIn(false);
        setEmail(null);
        console.log(err);
      });
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
    // Данные из стейт-переменной currentUser доступны всем компонентам
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page__container">
          <Header email={email} onSignOut={signOut} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={Main}
                  isProfileLoading={isProfileLoading}
                  isCardsLoading={isCardsLoading}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              }
            />
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegister} />}
            />
            <Route path="/sign-in" element={<Login onLogin={checkToken} />} />
          </Routes>
        </div>
      </div>
      <Footer />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <InfoTooltip
        isOpen={isRegOkInfoTooltipOpen}
        title={"Вы успешно зарегистрировались!"}
        imgSrs={RegOkImg}
        onClose={closeAllPopups}
      />
      <InfoTooltip
        isOpen={isRegErrInfoTooltipOpen}
        title={"Что-то пошло не так! Попробуйте ещё раз."}
        imgSrs={RegErrImg}
        onClose={closeAllPopups}
      />
      <PopupWithForm
        isOpen={false}
        name="delete-card"
        title="Вы уверены?"
        buttonText="Да"
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
