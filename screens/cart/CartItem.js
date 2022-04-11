import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
const dimensions = Dimensions.get("screen");
export default function CartItem({ c }) {
  return (
    <>
      <View style={styles.row}>
        <Image style={styles.image} source={{ uri: c?.image }} />
        <Text style={{ fontSize: dimensions.width / 25 }}>{c?.name}</Text>
        <Text
          style={{ fontSize: dimensions.width / 25 }}
        >{`${c?.price} TL`}</Text>
      </View>
      <Divider />
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginVertical: dimensions.width / 45,
    marginHorizontal: dimensions.width / 40,
    width: dimensions.width / 1.08,
    height: dimensions.height / 11,
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: dimensions.width / 5.08,
    height: dimensions.height / 11.1,
  },
});
