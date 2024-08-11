import React from "react";
import ReactDOM from "react-dom/client";

import 'mesto_ui_kit/styles';
import { InfoTooltip}  from "mesto_ui_kit/InfoTooltip";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";

const App = () => {

  return (
    <BrowserRouter>
      <div style={{backgroundColor: "black"}}>
        <Switch>
          <Route path="/signup">
            <Register onRegistered={() => console.log("вы зарегистрировались")} />
          </Route>
          <Route path="/signin">
            <Login onLoggedIn={(email) => console.log(`вы вошли как ${email}`)} />
          </Route>
        </Switch>
      </div>
      <InfoTooltip />
    </BrowserRouter>
  );
};
const rootElement = document.getElementById("root")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)
