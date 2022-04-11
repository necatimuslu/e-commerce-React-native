import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Checkout from "../screens/cart/Checkout";
import Confirm from "../screens/cart/Confirm";
import Payment from "../screens/cart/Payment";

const Tab = createMaterialTopTabNavigator();
export default function CheckoutNavgation() {
  return (
    <Tab.Navigator initialRouteName="check">
      <Tab.Screen
        name="check"
        component={Checkout}
        options={{ title: "Sipariş" }}
      />
      <Tab.Screen
        name="payment"
        component={Payment}
        options={{ title: "Ödeme" }}
      />
      <Tab.Screen
        name="confirm"
        component={Confirm}
        options={{ title: "Onayla" }}
      />
    </Tab.Navigator>
  );
}
