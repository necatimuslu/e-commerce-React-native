import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { registerUser } from "../../services/authService";
import Error from "../../global/Error";
const dimensions = Dimensions.get("screen");
export default function Register({ navigation }) {
  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState();
  const handleSubmit = () => {
    if (
      userForm.email == undefined ||
      userForm.password == undefined ||
      userForm.email == "" ||
      userForm.password == ""
    ) {
      setError("Email ve şifre alanları boş bırakılamaz");
      return;
    }
    registerUser(userForm)
      .then(() => {
        console.log("kayıt başarılı");
        setUserForm({
          username: "",
          email: "",
          password: "",
        });
        navigation.navigate("login");
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: dimensions.width / 15, fontWeight: "600" }}>
        Kayıt ol
      </Text>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginTop: dimensions.width / 10 }}>
          <TextInput
            placeholder="Kullanıcı adı giriniz"
            style={styles.input}
            value={userForm.username}
            onChangeText={(text) =>
              setUserForm({ ...userForm, username: text })
            }
          />
          <TextInput
            placeholder="Email giriniz"
            style={styles.input}
            value={userForm.email}
            onChangeText={(text) => setUserForm({ ...userForm, email: text })}
          />
          <TextInput
            placeholder="Şifre giriniz"
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(text) =>
              setUserForm({ ...userForm, password: text })
            }
            value={userForm.password}
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
            Kayıt ol
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
          Hesabınız var mı?
        </Text>
        <Pressable
          style={{ marginLeft: dimensions.width / 55 }}
          onPress={() => navigation.navigate("login")}
        >
          <Text
            style={{
              color: "blue",
              fontSize: dimensions.width / 25,
              fontWeight: "600",
            }}
          >
            Giriş
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: dimensions.width / 25,
    marginHorizontal: dimensions.width / 28,
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
