import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import Header from "../../shared/Header";
import { useSelector } from "react-redux";
import { Divider } from "react-native-elements";
import { useDispatch } from "react-redux";
import { clearCart, removeFromCart } from "../../store/actions/cartAction";
import CartItem from "./CartItem";
import { FontAwesome5 } from "@expo/vector-icons";
const dimensions = Dimensions.get("screen");
export default function CartContainer({ navigation }) {
  const { carts } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  let total = 0;
  carts.forEach((c) => {
    return (total += c.price);
  });
  const handleDelete = () => {
    dispatch(clearCart());
  };
  const handleProductDeleteBy = (item) => {
    dispatch(removeFromCart(item.item));
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.cartTitle}>
        <Text style={styles.titleText}>Resim</Text>
        <Text style={styles.titleText}>Ürün adı</Text>
        <Text style={styles.titleText}>Fiyat</Text>
      </View>
      <Divider />

      {carts.length > 0 ? (
        <SwipeListView
          showsVerticalScrollIndicator={false}
          data={carts}
          keyExtractor={(item) => item._id}
          renderItem={(c) => <CartItem c={c.item} />}
          renderHiddenItem={(data) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  flex: 1,
                }}
              >
                <TouchableOpacity
                  style={{
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingRight: 25,
                    height: 70,
                    width: dimensions.width / 4,
                    backgroundColor: "red",
                  }}
                  onPress={() => handleProductDeleteBy(data)}
                >
                  <FontAwesome5
                    name="trash"
                    size={dimensions.width / 20}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            );
          }}
          disableRightSwipe={true}
          previewOpenDelay={3000}
          friction={1000}
          tension={40}
          stopLeftSwipe={75}
          leftOpenValue={75}
          rightOpenValue={-75}
        />
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: dimensions.width / 2,
          }}
        >
          <Text style={{ fontSize: dimensions.width / 22 }}>
            Sepeteniz boş Lütfen ürün ekleyiniz.
          </Text>
        </View>
      )}

      <View style={styles.bottomCart}>
        <Text
          style={{
            color: "red",
            fontSize: dimensions.width / 25,
            fontWeight: "800",
          }}
        >{`${total} TL`}</Text>
        <View style={styles.bottomC}>
          <TouchableOpacity style={styles.toucBtn} onPress={handleDelete}>
            <Text style={{ color: "#fff", fontSize: dimensions.width / 25 }}>
              Sil
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toucBtn2}
            onPress={() => navigation.navigate("check-out")}
          >
            <Text style={{ color: "#fff", fontSize: dimensions.width / 25 }}>
              Sipariş Sayfası
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cartTitle: {
    flexDirection: "row",
    marginVertical: dimensions.width / 85,
    marginHorizontal: dimensions.width / 40,
    width: dimensions.width / 1.08,
    height: dimensions.height / 25,
    justifyContent: "space-between",
    alignItems: "center",
  },

  titleText: {
    fontSize: dimensions.width / 20,
    fontWeight: "800",
  },
  bottomCart: {
    width: dimensions.width / 1.08,
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    elevation: 0,
    marginHorizontal: dimensions.width / 30,
    marginBottom: dimensions.width / 45,
    marginTop: dimensions.width / 15,
  },
  bottomC: {
    position: "absolute",
    bottom: 0,
    right: 0,
    flexDirection: "row",
  },
  toucBtn: {
    marginRight: dimensions.width / 25,
    width: dimensions.width / 10,
    height: dimensions.height / 26,
    backgroundColor: "#E53935",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: dimensions.width / 35,
  },
  toucBtn2: {
    marginRight: dimensions.width / 25,
    width: dimensions.width / 3.2,
    height: dimensions.height / 26,
    backgroundColor: "#00897B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: dimensions.width / 35,
  },
});
