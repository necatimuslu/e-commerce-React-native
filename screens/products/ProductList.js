import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import ProductCard from "./ProductCard";
const dimensions = Dimensions.get("screen");
export const ProductList = ({ item, Toast }) => {
  return (
    <View style={styles.container}>
      <ProductCard item={item} Toast={Toast} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: dimensions.width / 2 - dimensions.width / 15,
    height: dimensions.height / 3.3,

    marginTop: dimensions.width / 10,
    marginBottom: dimensions.width / 30,
    marginHorizontal: dimensions.width / 40,
    borderWidth: 0.3,
    borderColor: "rgba(0,0,0,0.4)",
    borderRadius: dimensions.width / 40,
  },
});
