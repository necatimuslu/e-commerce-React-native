import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
const dimensions = Dimensions.get("screen");
export default function Header() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/movie.png")}
        style={styles.image}
      />
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: dimensions.width,
    height: dimensions.height / 16,
    backgroundColor: "#fff",
    marginBottom: dimensions.width / 40,
  },
  image: {
    width: dimensions.width,
    height: dimensions.height / 16,
    resizeMode: "contain",
  },
});
