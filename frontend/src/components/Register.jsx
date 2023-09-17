import { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";
import * as auth from "../utils/auth.js";

function Register({ onRegister }) {
  const [formValue, setFormValue] = useState({
    password: "",
    email: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const { password, email } = formValue;

    onRegister(auth.register(password, email));
  };

  return (
    <AuthForm
      title="Регистрация"
      buttonTitle="Зарегистрироваться"
      onSubmit={handleSubmit}
      formValue={formValue}
      onChange={handleChange}
      children={
        <div className="auth__signin">
          <p>Уже зарегистрированы?</p>
          <Link to="/sign-in" className="auth__link opacity">
            Войти
          </Link>
        </div>
      }
    />
  );
}

export default Register;
