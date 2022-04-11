import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
const dimensions = Dimensions.get("screen");
export default function Error(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    margin: dimensions.width / 35,
  },
  text: {
    color: "red",
    fontSize: dimensions.width / 25,
  },
});
