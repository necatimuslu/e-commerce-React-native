import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
const dimensions = Dimensions.get("screen");
export const SearchInput = ({
  keyword,
  setKeyword,
  onFocus,
  onBlur,
  focus,
}) => {
  const handleSearch = (text) => {
    setKeyword(text.toLowerCase());
  };

  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity style={{ paddingLeft: dimensions.width / 35 }}>
        <FontAwesome5
          name="search"
          size={dimensions.width / 20}
          color="#9E9E9E"
        />
      </TouchableOpacity>
      <TextInput
        placeholder={focus == true ? "" : "Ara..."}
        style={styles.input}
        value={keyword}
        onChangeText={handleSearch}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {focus == true && (
        <TouchableOpacity
          onPress={() => {
            onBlur();
            setKeyword("");
          }}
        >
          <EvilIcons
            name="close"
            size={dimensions.width / 20}
            color="#9E9E9E"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: dimensions.width,
    height: dimensions.height / 18,
    backgroundColor: "#F5F5F5",
    marginBottom: dimensions.height / 75,
    borderWidth: 0.3,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: dimensions.width / 20,
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    fontSize: dimensions.width / 22,
    paddingLeft: dimensions.width / 35,

    width: dimensions.width / 1.2,
  },
});
