import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Error from "../../global/Error";
import AuthGlobal from "../../context/AuthGlobal";
import { loginUser } from "../../context/authAction";
const dimensions = Dimensions.get("screen");
export default function Login({ navigation }) {
  const context = useContext(AuthGlobal);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if (context.stateUser.isAuthenticated == true) {
      navigation.navigate("user-profile");
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    if (
      email === "" ||
      password === "" ||
      email == undefined ||
      password == undefined
    ) {
      setError("email ve şifre boş bırakılmaz");
      return;
    } else {
      loginUser({ email, password }, context.dispatch);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: dimensions.width / 15, fontWeight: "700" }}>
        Giriş
      </Text>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: dimensions.width / 10 }}>
          <TextInput
            placeholder="Email giriniz"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Şifre giriniz"
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>

        {error && <Error message={error} />}
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text
            style={{
              fontSize: dimensions.width / 18,
              color: "#fff",
              fontWeight: "600",
            }}
          >
            Giriş
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      <View
        style={{
          flexDirection: "row",
          margin: dimensions.width / 20,
        }}
      >
        <Text style={{ fontSize: dimensions.width / 25 }}>
          Hesabınız yok mu{" "}
        </Text>
        <Pressable
          style={{ marginLeft: dimensions.width / 55 }}
          onPress={() => navigation.navigate("register")}
        >
          <Text
            style={{
              color: "blue",
              fontSize: dimensions.width / 25,
              fontWeight: "600",
            }}
          >
            Kayıt ol
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: dimensions.width / 20,
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
  btn: {
    width: dimensions.width / 1.22,
    height: dimensions.height / 16,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: dimensions.width / 25,
    borderRadius: dimensions.width / 30,
    marginTop: dimensions.width / 15,
  },
});
