import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ActivityIndicator,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";

import React, { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import ProductSearch from "./ProductSearch";
import { deleteProduct, getAllProducts } from "../../services/productService";
import { Divider } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
const dimensions = Dimensions.get("screen");
export default function Products({ navigation }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchAllProducts();

    return () => {
      setLoading(false);
    };
  }, []);
  const fetchAllProducts = () => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleDelete = (id) => {
    deleteProduct(id)
      .then(() => {
        Toast.show({
          type: "error",
          text1: "Başarılı",
          text2: "Ürün silindi",
        });
        fetchAllProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <View style={styles.addHeaderRow}>
        <TouchableOpacity style={styles.toucBtn3}>
          <FontAwesome5 name="shopping-bag" size={24} color="white" />
          <Text
            style={{
              marginLeft: dimensions.width / 55,
              color: "#FFF",
              fontWeight: "600",
              fontSize: dimensions.width / 28,
            }}
          >
            Siparişler
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toucBtn3}
          onPress={() => navigation.navigate("product-form")}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text
            style={{
              marginLeft: dimensions.width / 85,
              color: "#FFF",
              fontWeight: "600",
              fontSize: dimensions.width / 28,
            }}
          >
            Ürün ekle
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toucBtn3}
          onPress={() => navigation.navigate("categories")}
        >
          <Ionicons name="add" size={24} color="white" />
          <Text
            style={{
              color: "#FFF",
              fontWeight: "600",
              fontSize: dimensions.width / 28,
            }}
          >
            Kategori ekle
          </Text>
        </TouchableOpacity>
      </View>
      <ProductSearch keyword={keyword} setKeyword={setKeyword} />

      <View style={styles.titleCon}>
        <Text style={styles.titleText}>Resim</Text>
        <Text style={styles.titleText}>Ürün adı</Text>
        <Text style={styles.titleText}>Açıklama</Text>
        <Text style={styles.titleText}>Fiyat</Text>
        <Text style={styles.titleText}>Aksiyon</Text>
      </View>
      <Divider />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity onLongPress={() => setModalVisible(true)}>
            {products
              .filter((x) => x.name.toLowerCase().includes(keyword))
              .map((p, i) => (
                <TouchableOpacity
                  key={p._id}
                  onPress={() =>
                    navigation.navigate("product-form", { item: p })
                  }
                >
                  <View
                    style={[
                      styles.cardContainer,
                      { backgroundColor: i % 2 == 0 ? "white" : "gainsboro" },
                    ]}
                  >
                    <Image
                      source={{ uri: p?.image }}
                      style={{ height: 50, width: 50 }}
                    />
                    <Text style={styles.textStyle}>
                      {p?.name ? p.name.substring(0, 10) + "..." : p.name}
                    </Text>
                    <Text style={styles.textStyle}>
                      {p?.description
                        ? p.description.substring(0, 10) + "..."
                        : p.description}
                    </Text>
                    <Text style={styles.textStyle}>{`${p?.price}TL`}</Text>
                    <Pressable
                      style={styles.presBtn}
                      onPress={() => handleDelete(p?._id)}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: dimensions.width / 25,
                        }}
                      >
                        Sil
                      </Text>
                    </Pressable>
                  </View>
                </TouchableOpacity>
              ))}
          </TouchableOpacity>
        )}
        <Toast topOffset={50} />

        <Modal
          animationType="fade"
          onRequestClose={() => {
            setModalVisible(false);
          }}
          visible={modalVisible}
          transparent={true}
        >
          <View style={styles.flexModal}>
            <View style={styles.modalView}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={styles.toucBtn}
                  onPress={() => {
                    navigation.navigate("product-form");
                    setModalVisible(false);
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontSize: dimensions.width / 25 }}
                  >
                    Güncelle
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.toucBtn2}
                  onPress={() => setModalVisible(false)}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: dimensions.width / 25,
                    }}
                  >
                    Kapat
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: dimensions.width / 45,
    marginHorizontal: dimensions.width / 45,
    justifyContent: "space-between",
    flex: 1,
  },
  cardContainer: {
    flexDirection: "row",
    width: dimensions.width / 1.1,
    height: dimensions.height / 20,
    marginVertical: dimensions.width / 40,
    marginHorizontal: dimensions.width / 80,
    alignItems: "center",
    justifyContent: "space-between",
  },
  presBtn: {
    height: dimensions.width / 20,
    width: dimensions.width / 15,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: dimensions.width / 65,
    marginLeft: dimensions.width / 90,
  },
  titleCon: {
    flexDirection: "row",
    width: dimensions.width / 1.1,
    height: dimensions.height / 40,
    marginVertical: dimensions.width / 40,
    marginHorizontal: dimensions.width / 40,
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: dimensions.width / 25,
    fontWeight: "600",
  },
  textStyle: {
    marginLeft: dimensions.width / 90,
  },
  flexModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: dimensions.width / 2.4,
    height: dimensions.height / 6,
    borderWidth: 0.3,
    borderColor: "rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: dimensions.width / 35,
  },
  toucBtn: {
    width: dimensions.width / 6,
    height: dimensions.height / 15.5,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: dimensions.width / 35,
    marginRight: dimensions.width / 45,
  },
  toucBtn2: {
    width: dimensions.width / 6,
    height: dimensions.height / 15.5,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: dimensions.width / 35,
  },
  addHeaderRow: {
    flexDirection: "row",
    marginTop: dimensions.width / 55,
    marginBottom: dimensions.width / 35,
    justifyContent: "space-between",
    marginHorizontal: dimensions.width / 55,
  },
  toucBtn3: {
    flexDirection: "row",
    backgroundColor: "#1E88E5",
    width: dimensions.width / 3.2,
    height: dimensions.height / 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: dimensions.height / 65,
  },
});
