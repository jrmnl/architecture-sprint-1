import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import PopupWithForm from "./components/PopupWithForm";
import ImagePopup from "./components/ImagePopup";

import "./index.css"
import { InfoTooltip, triggerInfoTooltop } from "./components/InfoTooltip";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState();
  return (
    <>
      <div className="container">
        <div>Name: mesto-ui-kit</div>
        <div>Framework: react</div>
        <div>Language: JavaScript</div>
        <button onClick={() => setIsOpen(true)}>
          Проверить попап
        </button>
        <button onClick={() => setImage({mame: 'чудо картинка', link: 'https://lh3.googleusercontent.com/proxy/NC_pTrAaiV9Wmh3cVjwqPOE13KBh9Yqm9f1FEOVVaIBeCQl1UiTlM5iwnteCE0ZDwSNi8jb7ADYvhTx4U-R30-qiHdYYL1405MmfukCGOS_1RZeAq4dOIF1v'})}>
          Проверить картинку
        </button>
        <button onClick={() => triggerInfoTooltop("success", "успешный успех")}>
          Тригернуть тултип (успех)
        </button>
        <button onClick={() => triggerInfoTooltop("error", "супер ошибка")}>
          Тригернуть тултип (ошибка)
        </button>
      </div>
      <PopupWithForm
        isOpen={isOpen} onSubmit={() => setIsOpen(false)} onClose={() => setIsOpen(false)} title="Проверка" name="checl"
      >
        Внутренности попапа
      </PopupWithForm>
      <ImagePopup card={image} onClose={() => setImage(undefined)} />
      <InfoTooltip/>
    </>
  );
};
const rootElement = document.getElementById("root")
if (!rootElement) throw new Error("Failed to find the root element")

const root = ReactDOM.createRoot(rootElement)

root.render(<App />)
