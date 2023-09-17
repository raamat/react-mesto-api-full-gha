import { Link, useNavigate, useLocation } from "react-router-dom";

function Header({ email, onSignOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__logo"></div>
      <ul className="header__menu">
        <li>
          <p className="header__email">{email ?? ""}</p>
        </li>
        {location.pathname === "/" && (
          <li>
            <button className="header__button opacity" onClick={onSignOut}>
              Выйти
            </button>
          </li>
        )}
        {location.pathname === "/sign-up" && (
          <li>
            <Link to="/sign-in" className="header__link opacity">
              {" "}
              Войти
            </Link>
          </li>
        )}
        {location.pathname === "/sign-in" && (
          <li>
            <Link to="/sign-up" className="header__link opacity">
              {" "}
              Зарегистрироваться
            </Link>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
