function AuthForm({
  title,
  buttonTitle,
  onSubmit,
  formValue,
  onChange,
  children,
}) {
  return (
    <div className="auth">
      <h2 className="auth__title">{title}</h2>
      <form className="auth__form" onSubmit={onSubmit}>
        <input
          type="email"
          id="email"
          name="email"
          required
          minLength="5"
          maxLength="20"
          placeholder="Email"
          value={formValue.email}
          onChange={onChange}
        ></input>
        <input
          type="password"
          id="password"
          name="password"
          required
          minLength="5"
          maxLength="20"
          placeholder="Пароль"
          value={formValue.password}
          onChange={onChange}
        ></input>
        <button className="auth__button" type="submit">
          {buttonTitle}
        </button>
      </form>
      {children}
    </div>
  );
}

export default AuthForm;
