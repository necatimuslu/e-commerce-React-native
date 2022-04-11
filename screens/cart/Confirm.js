import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import { addNewOrder } from "../../services/productService";

const dimensions = Dimensions.get("screen");
export default function Confirm({ route }) {
  const order = route?.params?.order;

  const handleSubmit = () => {
    addNewOrder(order)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: dimensions.width / 15,
            fontWeight: "600",
            marginVertical: dimensions.width / 45,
          }}
        >
          Sipariş Onayı
        </Text>
      </View>
      <ScrollView>
        <View style={styles.boxCon}>
          <Text
            style={{
              fontSize: dimensions.width / 22,
              fontWeight: "500",
              marginBottom: dimensions.width / 45,
            }}
          >
            Sevk Edilecek Adres :
          </Text>
          <Divider color="black" />
          <Text style={styles.text}>Adres: {order?.shippingAddress1}</Text>
          <Divider color="black" />
          <Text style={styles.text}>Adres2: {order?.shippingAddress2}</Text>
          <Divider color="black" />
          <Text style={styles.text}>Posta kodu: {order?.zip}</Text>
          <Divider color="black" />
          <Text style={styles.text}>Şehir : {order?.city}</Text>
          <Divider color="black" />
          <Text style={styles.text}>Numara : {order?.phone}</Text>
          <Divider color="black" />
        </View>
      </ScrollView>
      <ScrollView>
        <View style={styles.boxCon1}>
          {order?.orderItems.map((o, i) => {
            return (
              <View style={styles.row2} key={i}>
                <Image
                  source={{ uri: o?.image }}
                  style={{
                    width: dimensions.width / 4,
                    height: dimensions.width / 4,
                  }}
                />
                <Text
                  style={{
                    color: "red",
                    fontSize: dimensions.width / 20,
                    fontWeight: "600",
                  }}
                >
                  {`${o?.price} TL`}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.toucBtn} onPress={handleSubmit}>
        <Text
          style={{
            fontSize: dimensions.width / 22,
            fontWeight: "600",
            color: "#fff",
          }}
        >
          Sipariş ver
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: dimensions.width / 25,
    marginHorizontal: dimensions.width / 25,
  },
  boxCon: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E64A19",
    height: dimensions.height / 2.8,
    borderRadius: dimensions.width / 50,
    marginBottom: dimensions.width / 55,
  },
  text: {
    fontSize: dimensions.width / 25,
    fontWeight: "400",
  },
  boxCon1: {
    width: dimensions.width / 1.09,
    justifyContent: "center",

    borderWidth: 1,
    borderColor: "#E64A19",
    height: dimensions.height / 4.8,
    borderRadius: dimensions.width / 50,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: dimensions.width / 20,
  },
  toucBtn: {
    width: dimensions.width / 1.1,
    height: dimensions.height / 20,
    marginVertical: dimensions.width / 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2196F3",
    borderRadius: dimensions.width / 40,
  },
});
