import React from 'react';
import * as auth from "../utils/auth.js";

function useLocalToken(history, onChecked) {
  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          onChecked(res.data.email);
          history.push("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
  }, [history]);
}

export {useLocalToken};