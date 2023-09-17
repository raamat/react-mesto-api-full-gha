function InfoTooltip({ isOpen, onClose, title, imgSrs }) {
  return (
    <div className={isOpen ? `popup popup_opened` : `popup`}>
      <div className="popup__container popup__container_type_tooltip">
        <button
          className="popup__close-button opacity"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__tooltip-image"
          src={imgSrs}
          alt="Статус регистрации"
        />
        <h2 className="popup__title">{title}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
