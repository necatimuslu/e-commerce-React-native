import React, { useContext } from "react";
import { BottomTabBarHeightContext } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import AuthGlobal from "../context/AuthGlobal";
import HomeNavigation from "./HomeNavigation";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import CartNavigation from "./CartNavigation";
import CartIcon from "../shared/CartIcon";
import UserNavigation from "./UserNavigation";
import AdminNavigation from "./AdminNavigation";
const Tab = createBottomTabNavigator();
const dimensions = Dimensions.get("screen");
const Main = () => {
  const { carts } = useSelector((state) => ({ ...state }));
  const context = useContext(AuthGlobal);
  console.log(context.stateUser.user.isAdmin);
  return (
    <BottomTabBarHeightContext.Consumer>
      {(tabBarHeight) => (
        <Tab.Navigator
          initialRouteName="home"
          screenOptions={{
            headerShown: false,
            headerStatusBarHeight: tabBarHeight,
            tabBarHideOnKeyboard: false,
          }}
        >
          <Tab.Screen
            name="home"
            component={HomeNavigation}
            options={{
              title: "Anasayfa",
              headerShown: false,
              tabBarActiveTintColor: "#F57F17",
              tabBarIcon: () => (
                <Ionicons name="md-home-outline" size={26} color="black" />
              ),
            }}
          />
          <Tab.Screen
            name="cart"
            component={CartNavigation}
            options={{
              title: "Sepet",
              tabBarActiveTintColor: "#F57F17",
              headerShown: false,
              tabBarIcon: () => (
                <>
                  <AntDesign name="shoppingcart" size={24} color="black" />

                  {carts.length > 0 ? (
                    <View
                      style={[
                        carts.length > 99
                          ? {
                              position: "absolute",
                              top: dimensions.height / 99,
                              right: dimensions.width / 99,
                            }
                          : {
                              position: "absolute",
                              top: dimensions.height / 99,
                              right: dimensions.height / 50,
                              justifyContent: "center",
                              alignItems: "center",
                              alignContent: "center",
                            },
                      ]}
                    >
                      <CartIcon />
                    </View>
                  ) : null}
                </>
              ),
            }}
          />
          {context.stateUser.user.isAdmin == true ? (
            <Tab.Screen
              name="admin"
              component={AdminNavigation}
              options={{
                headerShown: false,
                title: "Admin",
                tabBarActiveTintColor: "#F57F17",
                tabBarIcon: () => (
                  <MaterialIcons name="security" size={24} color="black" />
                ),
              }}
            />
          ) : null}

          <Tab.Screen
            name="user"
            component={UserNavigation}
            options={{
              title: "User",
              tabBarActiveTintColor: "#F57F17",
              headerShown: false,
              tabBarIcon: () => <Feather name="user" size={24} color="black" />,
            }}
          />
        </Tab.Navigator>
      )}
    </BottomTabBarHeightContext.Consumer>
  );
};

export default Main;
