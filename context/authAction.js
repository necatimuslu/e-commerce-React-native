import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import axios from "axios";
import { baseUrl } from "../global/baseUrl";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const loginUser = async (userForm, dispatch) => {
  await axios
    .post(`${baseUrl}/user/login`, userForm)
    .then((res) => {
      const data = res.data;
      if (data) {
        const token = data.token;
        AsyncStorage.setItem("@auth", token);
        const decoded = jwtDecode(token);
        dispatch(setCurrentUser(decoded, data));
      } else {
        logOut(dispatch);
      }
    })
    .catch((err) => {
      console.log(err);
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Hata",
        text2: "",
      });
      logOut(dispatch);
    });
};

export const getUser = async (id) => {
  await axios
    .get(`${baseUrl}/user/${id}`)
    .then((res) => {})
    .catch((err) => {
      console.log(err);
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Hata",
        text2: "",
      });
    });
};

export const logOut = async (dispatch) => {
  await AsyncStorage.removeItem("@auth");
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};
