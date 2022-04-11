import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import Main from "./navigation/Main";
import store from "./store/store";
import Auth from "./context/auth";

export default function App() {
  return (
    <Auth>
      <Provider store={store}>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </Provider>
    </Auth>
  );
}
