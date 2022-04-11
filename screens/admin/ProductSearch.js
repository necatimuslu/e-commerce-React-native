import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
const dimensions = Dimensions.get("screen");
export default function ProductSearch({ keyword, setKeyword }) {
  const handleSearch = (text) => {
    setKeyword(text.toLowerCase());
  };
  return (
    <View style={styles.container}>
      <AntDesign
        name="search1"
        size={dimensions.width / 20}
        color="#9E9E9E"
        style={{ marginLeft: dimensions.width / 40 }}
      />
      <TextInput
        placeholder="Ara..."
        style={{
          marginLeft: dimensions.width / 40,
          width: dimensions.width / 1.2,
        }}
        onChangeText={handleSearch}
        value={keyword}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: dimensions.width / 45,
    marginHorizontal: dimensions.width / 45,
    backgroundColor: "#E0E0E0",
    height: dimensions.width / 10,
    borderRadius: dimensions.width / 55,
    alignItems: "center",
  },
});
