import React from "react";
import ReactDOM from "react-dom/client";

import {Places, triggerAddPlacePopup} from "./components/Places"

import 'mesto_ui_kit/styles';

const App = () => {
  return (
    <div style={{backgroundColor: "black"}}>
      <button onClick={triggerAddPlacePopup}>Вызвать попап</button>
      <Places />
    </div>
  );
};
const rootElement = document.getElementById("root")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)
