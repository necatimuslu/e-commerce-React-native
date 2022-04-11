import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductContainer from "../screens/products/ProductContainer";
import ProductDetail from "../screens/products/ProductDetail";
const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="product">
      <Stack.Screen
        name="product"
        component={ProductContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="product-detail"
        component={ProductDetail}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
