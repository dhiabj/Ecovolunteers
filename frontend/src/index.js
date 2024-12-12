import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import "./index.css";
import ContextWrapper from "./context/ContextWrapper";
import { getMonth } from "./util";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToggleProvider } from "./context/ToggleContext";
import { Provider } from "react-redux";
import store from "./store/ReduxStore";
import { FollowingProvider } from "./context/FollowingContext";
import { CharacterAnimationsProvider } from "./MetaVerse/contexts/CharacterAnimations";
import { CharacterCustomizationProvider } from "./MetaVerse/contexts/CharacterCustomizationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AuthProvider>
        <FollowingProvider>
          <CharacterCustomizationProvider>
            <CharacterAnimationsProvider>
              <ToggleProvider>
                <ContextWrapper>
                  <Routes>
                    <Route path="/*" element={<App />} />
                  </Routes>
                </ContextWrapper>
              </ToggleProvider>
            </CharacterAnimationsProvider>
          </CharacterCustomizationProvider>
        </FollowingProvider>
      </AuthProvider>
    </BrowserRouter>
  </Provider>
);
