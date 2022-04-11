import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Header from "../../shared/Header";
const dimensions = Dimensions.get("screen");
export default function ProductDetail({ route }) {
  const [product, setProduct] = useState(route.params.item);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header />
      </View>
      <View style={styles.container3}></View>

      <View
        style={{
          width: dimensions.width / 1.1,
          height: dimensions.height / 3.5,
          marginTop: dimensions.width / 25,
        }}
      >
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>
      <View>
        <Text
          style={{
            fontSize: dimensions.width / 15,
            marginVertical: dimensions.width / 30,
          }}
        >
          {product.name}
        </Text>
        <Text
          style={{
            fontSize: dimensions.width / 20,
            marginVertical: dimensions.width / 30,
          }}
        >
          {product.description}
        </Text>
      </View>
      <View style={styles.bottomCon}>
        <View style={{ marginLeft: dimensions.width / 30 }}>
          <Text
            style={{ color: "red", fontSize: dimensions.width / 20 }}
          >{`${product.price} TL`}</Text>
        </View>
        <Pressable style={styles.pressBtn}>
          <Text style={{ color: "#fff", fontSize: dimensions.width / 25 }}>
            Ekle
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: dimensions.width / 1,
    height: dimensions.height,
    alignItems: "center",
  },
  container3: {
    marginHorizontal: dimensions.width / 35,
    marginVertical: dimensions.width / 30,
  },
  image: {
    width: dimensions.width / 1.1,
    height: dimensions.height / 4,
    resizeMode: "contain",
  },
  bottomCon: {
    position: "absolute",
    flexDirection: "row",
    width: dimensions.width / 1.1,
    justifyContent: "space-between",
    bottom: 65,
  },
  pressBtn: {
    width: dimensions.width / 7,
    height: dimensions.height / 20,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: dimensions.width / 45,
  },
});
