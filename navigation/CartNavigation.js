import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartContainer from "../screens/cart/CartContainer";
import CheckoutNavgation from "./CheckoutNavgation";
import Header from "../shared/Header";
import { SafeAreaView } from "react-native";

const Stack = createNativeStackNavigator();

export default function CartNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="cart-screen"
        component={CartContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="check-out"
        component={CheckoutNavgation}
        options={{
          header: () => (
            <SafeAreaView
              style={{
                backgroundColor: "#fff",
              }}
            >
              <Header />
            </SafeAreaView>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
