import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { CheckBox } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";

const dimensions = Dimensions.get("screen");
export default function Payment({ route, navigation }) {
  const paymentCarts = [
    { name: "Visa", value: 1 },
    { name: "MasterCart", value: 2 },
    { name: "Diğer", value: 3 },
  ];

  const order = route?.params?.order;
  const [selected, setSelected] = useState();
  const [selected1, setSelected1] = useState();
  const [selected2, setSelected2] = useState();
  const [cart, setCart] = useState();
  const handleSubmit = () => {
    navigation.navigate("confirm", { order });
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: dimensions.width / 20,
          }}
        >
          <Text
            style={{
              fontSize: dimensions.width / 15,
              fontWeight: "700",
            }}
          >
            Ödeme yöntemini seçiniz
          </Text>
        </View>

        <View>
          <View>
            <CheckBox
              title={"Nakit ödeme"}
              checked={selected}
              onPress={() => setSelected(!selected)}
            />
            <CheckBox
              title={"Banka Eft/Have"}
              checked={selected1}
              onPress={() => setSelected1(!selected1)}
            />
            <CheckBox
              title={"Kredi kartı"}
              checked={selected2}
              onPress={() => setSelected2(!selected2)}
            />
          </View>
        </View>
        {selected2 == true && (
          <>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{ fontSize: dimensions.width / 20, fontWeight: "700" }}
              >
                Kredi kartı seçeneği
              </Text>
            </View>
            <View>
              <Picker
                selectedValue={cart}
                onValueChange={(itemValue, itemIndex) => {
                  setCart(itemValue);
                  console.log(itemValue);
                }}
              >
                {paymentCarts.map((p, i) => (
                  <Picker.Item key={i} label={p.name} value={p.name} />
                ))}
              </Picker>
            </View>
          </>
        )}
        <View
          style={[
            selected2 == false
              ? {
                  marginTop: dimensions.width / 25,
                  justifyContent: "center",
                  alignItems: "center",
                }
              : {
                  marginTop: dimensions.width / -25,
                  justifyContent: "center",
                  alignItems: "center",
                },
          ]}
        >
          <TouchableOpacity
            style={[selected2 == false ? styles.btn : styles.btn2]}
            onPress={handleSubmit}
          >
            <Text style={{ fontSize: dimensions.width / 20, color: "#fff" }}>
              Gönder
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "red",
    width: dimensions.width / 1.2,
    height: dimensions.height / 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: dimensions.width / 30,
    borderRadius: dimensions.width / 35,
    marginTop: dimensions.height / 20,
  },
  btn2: {
    backgroundColor: "red",
    width: dimensions.width / 1.2,
    height: dimensions.height / 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: dimensions.width / 30,
    borderRadius: dimensions.width / 35,
    marginTop: -dimensions.width / 10,
  },
});
