import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { baseUrl } from "../../global/baseUrl";

import AuthGlobal from "../../context/AuthGlobal";
import { logOut } from "../../context/authAction";

const dimensions = Dimensions.get("screen");
export default function UserProfile({ navigation }) {
  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    if (
      context.stateUser.isAuthenticated === false ||
      context.stateUser.isAuthenticated === null
    ) {
      navigation.navigate("login");
    }

    AsyncStorage.getItem("@auth")
      .then((res) => {
        axios
          .get(
            `${baseUrl}/user/${context.stateUser.user._id}` /* {
          headers:{
            Authorization:`Bearer ${res}`
          }
        } */
          )
          .then((user) => setUserProfile(user.data));
      })
      .catch((err) => console.log(err));
  }, [context.stateUser.isAuthenticated]);
  console.log(userProfile);
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: dimensions.width / 14 }}>UserProfile</Text>
      <Text
        style={{
          fontSize: dimensions.width / 22,
          marginVertical: dimensions.width / 25,
        }}
      >
        email
      </Text>
      <Text
        style={{
          fontSize: dimensions.width / 22,
          marginVertical: dimensions.width / 25,
        }}
      >
        Phone
      </Text>
      <TouchableOpacity style={styles.btn}>
        <Text
          style={{
            fontSize: dimensions.width / 22,
            color: "#fff",
            fontWeight: "500",
          }}
        >
          Çıkış
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: dimensions.width / 25,
    marginHorizontal: dimensions.width / 25,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "red",
    width: dimensions.width / 5,
    height: dimensions.height / 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: dimensions.width / 20,
    borderRadius: dimensions.width / 40,
  },
});
