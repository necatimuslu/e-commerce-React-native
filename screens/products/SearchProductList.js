import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
const dimensions = Dimensions.get("screen");
export default function SearchProductList({ products }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        {products.map((p, i) => (
          <View style={styles.row} key={i}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: p?.image }} style={styles.image} />
            </View>
            <View style={{ marginLeft: dimensions.width / 35 }}>
              <Text
                style={{ fontSize: dimensions.width / 22, fontWeight: "600" }}
              >
                {p?.name}
              </Text>
              <Text
                style={{
                  fontSize: dimensions.width / 29,
                  fontWeight: "300",
                  color: "#BDBDBD",
                }}
              >
                {p?.description}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: dimensions.width / 35,
    marginVertical: dimensions.width / 85,
    width: dimensions.width / 1.06,
  },
  row: {
    flexDirection: "row",
  },
  imageContainer: {
    width: dimensions.width / 6,
    height: dimensions.height / 12,
    marginBottom: dimensions.width / 35,
    borderWidth: 0.3,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: dimensions.width / 35,
  },
  image: {
    width: dimensions.width / 6,
    height: dimensions.height / 12,
    resizeMode: "cover",
    borderRadius: dimensions.width / 35,
  },
});
