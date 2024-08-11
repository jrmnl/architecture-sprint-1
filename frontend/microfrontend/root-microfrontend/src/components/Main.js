import React from 'react';

import { Places, triggerAddPlacePopup } from "mesto_places/Places";
import Profile from "mesto_profile/Profile";

function Main() {
  return (
    <main className="content">
      <Profile onAddPlaceClick={triggerAddPlacePopup} />
      <Places />
    </main>
  );
}

export default Main;
