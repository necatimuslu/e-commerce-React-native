import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions/cartAction";

const dimensions = Dimensions.get("screen");
export default function ProductCard({ item, Toast }) {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    let data = dispatch(addToCart(item));

    if (data.payload != null) {
      Toast.show({
        type: "success",
        text1: "Başarılı",
        text2: "Sepete başarılı eklendi 👋",
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item?.image }} style={styles.image} />
      </View>
      <View style={styles.container2}>
        <Text style={styles.cardTitle}>{item?.name}</Text>
        <Text style={styles.cardPrice}>{`${item?.price} TL`}</Text>
        <Pressable style={styles.presBtn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Ekle</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: dimensions.width / 30,
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: dimensions.width / 23,
    paddingBottom: dimensions.width / 45,
    fontWeight: "500",
  },
  cardPrice: {
    fontSize: dimensions.width / 23,
    fontWeight: "700",
    color: "#FFB300",
    paddingBottom: dimensions.width / 45,
  },
  presBtn: {
    width: dimensions.width / 5,
    height: dimensions.height / 20,
    backgroundColor: "#009688",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: dimensions.width / 35,
  },
  btnText: {
    color: "#fff",
    fontSize: dimensions.width / 26,
  },
  imageContainer: {
    width: dimensions.width / 2.33,
    height: dimensions.height / 12,
  },
  image: {
    position: "absolute",
    top: dimensions.height / -20,
    width: dimensions.width / 2.33,
    height: dimensions.height / 10,
    resizeMode: "contain",
  },
});
