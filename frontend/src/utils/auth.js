// export const BASE_URL = "http://localhost:4000";
export const BASE_URL = "https://api.mesto.raamat.pw";

function checkErr(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(checkErr);
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then(checkErr);
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    metod: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkErr);
};
