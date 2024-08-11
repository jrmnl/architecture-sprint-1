import React from "react";
import { Route, useHistory, Switch } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";

import { InfoTooltip } from "mesto_ui_kit/InfoTooltip";

import Register from "mesto_auth/Register";
import Login from "mesto_auth/Login";
import { useLocalToken } from "mesto_auth/hooks/useLocalToken";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  //В компоненты добавлены новые стейт-переменные: email — в компонент App
  const [email, setEmail] = React.useState("");

  const history = useHistory();

  useLocalToken(history, email => {
    setEmail(email);
    setIsLoggedIn(true);
  });

  function onRegistered() {
    history.push("/signin");
  }

  function onLoggedIn(email) {
    setIsLoggedIn(true);
    setEmail(email);
    history.push("/");
  }

  function onSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    history.push("/signin");
  }

  return (
    <div className="page__content">
      <Header email={email} onSignOut={onSignOut} />
      <Switch>
        {/*Роут / защищён HOC-компонентом ProtectedRoute*/}
        <ProtectedRoute
          exact
          path="/"
          component={Main}
          loggedIn={isLoggedIn}
        />
        {/*Роут /signup и /signin не является защищёнными, т.е оборачивать их в HOC ProtectedRoute не нужно.*/}
        <Route path="/signup">
          <Register onRegistered={onRegistered} />
        </Route>
        <Route path="/signin">
          <Login onLoggedIn={onLoggedIn} />
        </Route>
      </Switch>
      <Footer />
      <InfoTooltip />
    </div>
  );
}

export default App;
