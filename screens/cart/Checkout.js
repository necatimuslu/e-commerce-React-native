import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import CountryPicker from "react-native-country-picker-modal";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const countries = require("../../global/countries.json");
const dimensions = Dimensions.get("screen");
export default function Checkout({ navigation }) {
  const { carts } = useSelector((state) => ({ ...state }));
  const [countryCode, setCountryCode] = useState("TR");
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [address1, setAddress1] = useState();
  const [address2, setAddress2] = useState();
  const [zip, setZip] = useState();
  const [city, setCity] = useState();
  const onSelect = (country) => {
    setCountryCode(country.code);
    setCountry(country);
  };
  const handleSubmit = () => {
    let order = {
      phone,
      shippingAddress1: address1,
      shippingAddress2: address2,
      zip,
      city,
      country,
      orderItems: carts,
    };
    navigation.navigate("payment", { order });
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: dimensions.width / 1.1,
        }}
      >
        <Text style={styles.shippingTitle}>Sipariş Adresi</Text>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          viewIsInsideTabBar={true}
          enableOnAndroid={true}
        >
          <TextInput
            placeholder="Telefon giriniz."
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => setPhone(text)}
            value={phone}
          />
          <TextInput
            placeholder="Adres giriniz"
            style={styles.input}
            onChangeText={(text) => setAddress1(text)}
            value={address1}
          />
          <TextInput
            placeholder="Adres giriniz"
            style={styles.input}
            onChangeText={(text) => setAddress2(text)}
            value={address2}
          />
          <TextInput
            placeholder="Şehir giriniz"
            style={styles.input}
            onChangeText={(text) => setCity(text)}
            value={city}
          />
          <TextInput
            placeholder="Posta kodu giriniz"
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => setZip(text)}
            value={zip}
          />
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <CountryPicker
              {...{
                countryCode,

                onSelect,
              }}
              visible
            />
          </View>
          <Pressable style={styles.presBtn} onPress={handleSubmit}>
            <Text
              style={{
                color: "#fff",
                fontWeight: "600",
                fontSize: dimensions.width / 20,
              }}
            >
              Gönder
            </Text>
          </Pressable>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: dimensions.width / 25,
  },
  shippingTitle: {
    fontSize: dimensions.width / 11,
    fontWeight: "600",
    marginBottom: dimensions.width / 35,
  },
  input: {
    width: dimensions.width / 1.2,
    height: dimensions.height / 12,
    borderRadius: dimensions.width / 30,
    borderWidth: 1,
    borderColor: "#1E88E5",
    padding: dimensions.width / 50,
    marginVertical: dimensions.width / 40,
    marginLeft: dimensions.width / 25,
  },
  presBtn: {
    width: dimensions.width / 1.4,
    marginHorizontal: dimensions.width / 15,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    height: dimensions.height / 20,
    borderRadius: dimensions.width / 20,
    marginVertical: dimensions.width / 25,
  },
});
