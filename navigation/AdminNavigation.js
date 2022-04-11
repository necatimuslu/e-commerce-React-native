import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Products from "../screens/admin/Products";
import Categories from "../screens/admin/Categories";
import Orders from "../screens/admin/Orders";
import ProductForm from "../screens/admin/ProductForm";
import CategoryForm from "../screens/admin/CategoryForm";

const Stack = createNativeStackNavigator();

const AdminNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="products"
        component={Products}
        options={{ title: "Ürünler" }}
      />
      <Stack.Screen
        name="categories"
        component={Categories}
        options={{ title: "Kategoriler" }}
      />
      <Stack.Screen name="orders" component={Orders} />
      <Stack.Screen
        name="product-form"
        component={ProductForm}
        options={{ title: "Ürün form" }}
      />
      <Stack.Screen
        name="category-form"
        component={CategoryForm}
        options={{ title: "Kategori form" }}
      />
    </Stack.Navigator>
  );
};

export default AdminNavigation;
