import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Swiper from "react-native-swiper";
const dimensions = Dimensions.get("screen");
export default function Banner() {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    setBannerData([
      { id: 1, image: require("../assets/images/banner1.jpeg") },
      { id: 2, image: require("../assets/images/banner2.jpeg") },
      { id: 3, image: require("../assets/images/banner3.jpeg") },
    ]);

    return () => setBannerData([]);
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Swiper
          autoplay={true}
          showsButtons={false}
          autoplayTimeout={5}
          dotColor="#fff"
          dotStyle={{ backgroundColor: "#B3E5FC" }}
        >
          {bannerData.map((b) => (
            <Image key={b.id} source={b.image} style={styles.image} />
          ))}
        </Swiper>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: dimensions.width / 20,
    marginHorizontal: dimensions.width / 40,

    width: dimensions.width / 1.05,
    height: dimensions.height / 3.5,
  },
  image: {
    width: dimensions.width / 1.05,
    height: dimensions.height / 3.5,
    resizeMode: "cover",
  },
});
