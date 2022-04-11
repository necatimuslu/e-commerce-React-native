import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/user/Login";
import Register from "../screens/user/Register";
import UserProfile from "../screens/user/UserProfile";

const Stack = createNativeStackNavigator();

const UserNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="login">
      <Stack.Screen
        name="login"
        component={Login}
        options={{ title: "Giriş" }}
      />
      <Stack.Screen
        name="register"
        component={Register}
        options={{ title: "Kayıt ol" }}
      />
      <Stack.Screen
        name="user-profile"
        component={UserProfile}
        options={{ title: "Profil" }}
      />
    </Stack.Navigator>
  );
};

export default UserNavigation;
