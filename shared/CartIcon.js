import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
const dimensions = Dimensions.get("screen");
export default function CartIcon() {
  const { carts } = useSelector((state) => ({ ...state }));
  return (
    <View
      style={[
        styles.container,
        {
          width:
            carts.length > 99 ? dimensions.width / 10 : dimensions.width / 15,
        },
      ]}
    >
      <Text style={{ color: "#fff", fontSize: dimensions.width / 25 }}>
        {carts.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: dimensions.height / 35,
    backgroundColor: "red",
    borderRadius: dimensions.width / 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
