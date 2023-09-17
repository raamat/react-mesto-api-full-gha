import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "./AuthForm";
import * as auth from "../utils/auth.js";

function Login({ onLogin }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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
    auth
      .authorize(password, email)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        onLogin();
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <AuthForm
      title="Вход"
      buttonTitle="Войти"
      onSubmit={handleSubmit}
      formValue={formValue}
      onChange={handleChange}
    />
  );
}

export default Login;
